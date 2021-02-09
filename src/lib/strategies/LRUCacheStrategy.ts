import { CacheStrategy } from '../interfaces'
import { CacheActionType, Nullable } from '../types'
import { BaseCacheAction, CacheActionFactory } from '../actions'

export class LRUCacheStrategy<TKey, TValue> implements CacheStrategy<TKey, TValue> {

  public static getStartTime: () => number = () => Date.now()

  public static getDuration: (start: number) => number = start => Date.now() - start

  readonly #capacity: number

  readonly #cache: Map<TKey, TValue>

  readonly #lru: Map<TKey, number>

  readonly #actionFactory: CacheActionFactory

  #hitCount: number

  #missCount: number

  public constructor (capacity: number) {
    this.#capacity = capacity
    this.#cache = new Map()
    this.#lru = new Map()
    this.#hitCount = 0
    this.#missCount = 0
    this.#actionFactory = new CacheActionFactory()
  }

  public * get (key: TKey): Generator<BaseCacheAction<TKey, TValue>, void, undefined> {
    const start = LRUCacheStrategy.getStartTime()
    const { HIT, MISS } = CacheActionType

    if (this.#cache.has(key)) {
      this.#lru.set(key, Date.now())
      this.#hitCount++

      yield this.#actionFactory.create<TKey, TValue>(HIT, {
        key,
        value: this.#cache.get(key) as TValue,
        duration: LRUCacheStrategy.getDuration(start)
      })
    } else {
      this.#missCount++

      yield this.#actionFactory.create<TKey, TValue>(MISS, {
        key,
        value: null,
        duration: LRUCacheStrategy.getDuration(start)
      })
    }
  }

  public * set (key: TKey, value: TValue): Generator<BaseCacheAction<TKey, TValue>, void, undefined> {
    const start = LRUCacheStrategy.getStartTime()
    const { PULL, PUSH } = CacheActionType

    if (this.#cache.size >= this.#capacity) {
      const [ oldestKey, oldestValue ] = this.getOldestEntries()

      this.#cache.delete(oldestKey as TKey)
      this.#lru.delete(oldestKey as TKey)

      yield this.#actionFactory.create<TKey, TValue>(PULL, {
        key,
        value: oldestValue,
        duration: LRUCacheStrategy.getDuration(start)
      })
    }

    this.#lru.set(key, Date.now())
    this.#cache.set(key, value)

    yield this.#actionFactory.create<TKey, TValue>(PUSH, {
      key,
      value: value,
      duration: LRUCacheStrategy.getDuration(start)
    })
  }

  public clear (): void {
    this.#cache.clear()
    this.#lru.clear()
    this.#hitCount = 0
    this.#missCount = 0
  }

  private getOldestEntries (): [ Nullable<TKey>, Nullable<TValue> ] {
    let max = Infinity
    let result: [ Nullable<TKey>, Nullable<TValue> ] = [ null, null ]

    for (const [ key, value ] of this.#lru.entries()) {
      if (value < max) {
        max = value
        result = [ key, this.#cache.get(key) as TValue ]
      }
    }

    return result
  }
}
