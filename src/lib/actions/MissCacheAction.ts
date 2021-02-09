import { CacheActionPayload } from '../types'
import { yellow } from '../utils'

import { BaseCacheAction } from './BaseCacheAction'

export class MissCacheAction<TKey, TValue> extends BaseCacheAction<TKey, TValue> {
  public constructor (payload: CacheActionPayload<TKey, TValue>) {
    super(payload)
  }

  public toString (): string {
    return yellow(`Cache miss, duration ${this.duration}ms`)
  }
}
