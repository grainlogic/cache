import { LRUCacheDecoratorOptions } from '../types'
import { NoopCacheLogger, ConsoleCacheLogger } from '../loggers'
import { LRUCacheStrategy } from '../strategies'
import { Cache } from '../Cache'
import { extendOptions } from '../utils'

import { asyncFunctionFactory, functionFactory } from './function-factory'

export function LRUCache (capacity: number, options: Partial<LRUCacheDecoratorOptions> = {}): MethodDecorator {
  const { debug, name, hashFn } = extendOptions(options)

  return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
    const origin = target[key]

    if (typeof origin !== 'function') {
      throw new Error('Object to be decorated must be a function')
    }

    const scope = name || origin.name
    const strategy = new LRUCacheStrategy<number, unknown>(capacity)
    const logger = debug ? new ConsoleCacheLogger(scope) : new NoopCacheLogger()
    const cache = new Cache<number, unknown>(strategy, logger)
    const isAsyncFunction = origin[Symbol.toStringTag] === 'AsyncFunction'

    descriptor.value = isAsyncFunction
      ? asyncFunctionFactory(cache, hashFn, origin)
      : functionFactory(cache, hashFn, origin)

    return descriptor
  }
}
