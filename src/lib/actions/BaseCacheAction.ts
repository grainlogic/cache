import { CacheActionPayload, Nullable } from '../types'

export abstract class BaseCacheAction<TKey, TValue> {
  protected readonly key: TKey

  protected readonly value: Nullable<TValue>

  protected readonly duration: number

  protected constructor ({ key, value, duration }: CacheActionPayload<TKey, TValue>) {
    this.key = key
    this.value = value
    this.duration = duration
  }

  public getValue (): Nullable<TValue> {
    return this.value
  }

  public abstract toString (): string
}
