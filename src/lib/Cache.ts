import { CacheLogger, CacheStrategy } from './interfaces'
import { Nullable } from './types'

export class Cache<TKey, TValue> {

  readonly #strategy: CacheStrategy<TKey, TValue>

  readonly #logger: CacheLogger

  public constructor (strategy: CacheStrategy<TKey, TValue>, logger: CacheLogger) {
    this.#strategy = strategy
    this.#logger = logger
  }

  public get (key: TKey): Nullable<TValue> {
    let value: Nullable<TValue> = null

    for (const action of this.#strategy.get(key)) {
      this.#logger.log(action.toString())
      value = action.getValue()
    }

    return value
  }

  public set (key: TKey, value: TValue): void {
    for (const action of this.#strategy.set(key, value)) {
      this.#logger.log(action.toString())
    }
  }

  public info (): void {
    this.#logger.log(this.#strategy.toString())
  }
}
