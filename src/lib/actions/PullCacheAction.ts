import { CacheActionPayload } from '../types'
import { blue } from '../utils'

import { BaseCacheAction } from './BaseCacheAction'

export class PullCacheAction<TKey, TValue> extends BaseCacheAction<TKey, TValue> {
  public constructor (payload: CacheActionPayload<TKey, TValue>) {
    super(payload)
  }

  public toString (): string {
    return blue(`Cache pull, duration ${this.duration}ms`)
  }
}
