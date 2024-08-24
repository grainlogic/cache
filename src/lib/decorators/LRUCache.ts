import {isObservable, of, tap} from 'rxjs'

import { LRUCacheDecoratorOptions } from '../types'
import { NoopCacheLogger, ConsoleCacheLogger } from '../loggers'
import { LRUCacheStrategy } from '../strategies'
import { Cache } from '../Cache'
import { extendOptions, isPromise } from '../utils'

export function LRUCache (capacity: number, options: Partial<LRUCacheDecoratorOptions> = {}): MethodDecorator {
  const { debug, name, hashFn } = extendOptions(options)

  return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    if (typeof target[key] !== 'function') {
      throw new Error('Object to be decorated must be a function')
    }

    const origin = target[key]
    const scope = name || origin.name
    const strategy = new LRUCacheStrategy<number, unknown>(capacity)
    const logger = debug ? new ConsoleCacheLogger(scope) : new NoopCacheLogger()
    const cache = new Cache<number, unknown>(strategy, logger)
    let isReturnPromise = false
    let isReturnObservable = false

    descriptor.value = function (...args: any[]): any {
      const hash = hashFn(args)
      const hit = cache.get(hash)

      if (hit !== null) {
        if (isReturnPromise) {
          return Promise.resolve(hit)
        } else if (isReturnObservable) {
          return of(hit)
        }

        return hit
      }

      const result = origin.apply(this, args)

      if (isPromise(result)) {
        isReturnPromise = true

        return result.then(value => {
          cache.set(hash, value)

          return value
        })
      } else if (isObservable(result)) {
        isReturnObservable = true

        return result.pipe(
            tap(value => {
              cache.set(hash, value)
            })
        )
      }

      return result
    }

    return descriptor
  }
}
