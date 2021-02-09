export type Nullable<T> = T | null

export type CacheOptions = {
  debug: boolean
  name: Nullable<string>
  hashFn: (...args: any[]) => any
}

export type LRUCacheDecoratorOptions = CacheOptions & {
}

export enum CacheActionType {
  HIT,
  MISS,
  PUSH,
  PULL
}

export type CacheActionPayload<TKey, TValue> = {
  key: TKey
  value: Nullable<TValue>
  duration: number
}
