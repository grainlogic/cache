import { CacheActionPayload } from '../types'
import { green } from '../utils'

import { BaseCacheAction } from './BaseCacheAction'

export class HitCacheAction<TKey, TValue> extends BaseCacheAction<TKey, TValue> {
  public constructor (payload: CacheActionPayload<TKey, TValue>) {
    super(payload)
  }

  public toString (): string {
    return green(`Cache hit: value - ${this.value}, duration - ${this.duration}ms`)
  }
}
