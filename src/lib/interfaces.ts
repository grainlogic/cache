import { BaseCacheAction } from './actions'

export interface CacheLogger {
  log (message: string): void
}

export interface CacheStrategy<TKey, TValue> {
  get (key: TKey): Generator<BaseCacheAction<TKey, TValue>, void, undefined>

  set (key: TKey, value: TValue): Generator<BaseCacheAction<TKey, TValue>, void, undefined>

  clear (): void

  toString (): string
}

export interface HashBuilder {
  makeHash (key: string): number
}
