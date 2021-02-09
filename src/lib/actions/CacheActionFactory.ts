import { CacheActionPayload, CacheActionType } from '../types'

import { BaseCacheAction } from './BaseCacheAction'
import { HitCacheAction } from './HitCacheAction'
import { MissCacheAction } from './MissCacheAction'
import { PullCacheAction } from './PullCacheAction'
import { PushCacheAction } from './PushCacheAction'
import { UnknownCacheAction } from './UnknownCacheAction'

export class CacheActionFactory {
  public create<TKey, TValue> (type: CacheActionType, payload: CacheActionPayload<TKey, TValue>): BaseCacheAction<TKey, TValue> {
    const { HIT, MISS, PUSH, PULL } = CacheActionType
    switch (type) {
      case HIT:
        return new HitCacheAction(payload)
      case MISS:
        return new MissCacheAction(payload)
      case PUSH:
        return new PushCacheAction(payload)
      case PULL:
        return new PullCacheAction(payload)
      default:
        return new UnknownCacheAction(payload)
    }
  }
}
