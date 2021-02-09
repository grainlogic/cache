import { CacheActionPayload } from '../types'
import { blue } from '../utils'

import { BaseCacheAction } from './BaseCacheAction'

export class PushCacheAction<TKey, TValue> extends BaseCacheAction<TKey, TValue> {
  public constructor (payload: CacheActionPayload<TKey, TValue>) {
    super(payload)
  }

  public toString (): string {
    return blue(`Cache push, duration ${this.duration}ms`)
  }
}
