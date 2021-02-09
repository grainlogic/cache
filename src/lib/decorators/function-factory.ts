import { Cache } from '../Cache'
import { hash } from '../utils'

export const asyncFunctionFactory = (
  cache: Cache<number, any>,
  hashFn: typeof hash,
  origin: (...args: any[]) => any
) => async (...args: any[]): Promise<any> => {
  const hash = hashFn(args)
  const hit = cache.get(hash)

  if (hit !== null) {
    return hit
  }

  const value = await origin.apply(this, args)

  cache.set(hash, value)

  return value
}

export const functionFactory = (
  cache: Cache<number, any>,
  hashFn: typeof hash,
  origin: (...args: any[]) => any
) => (...args: any[]): any => {
  const hash = hashFn(args)
  const hit = cache.get(hash)

  if (hit !== null) {
    return hit
  }

  const value = origin.apply(this, args)

  cache.set(hash, value)

  return value
}
