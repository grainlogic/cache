import { CacheActionPayload } from '../types'

import { BaseCacheAction } from './BaseCacheAction'

export class UnknownCacheAction<TKey, TValue> extends BaseCacheAction<TKey, TValue> {
  public constructor (payload: CacheActionPayload<TKey, TValue>) {
    super(payload)
  }

  public toString (): string {
    return 'Cache unknown action'
  }
}
