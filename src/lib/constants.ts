import { LRUCacheDecoratorOptions } from './types'
import { hash } from './utils'

export const CACHE_DECORATOR_DEFAULT_OPTIONS: LRUCacheDecoratorOptions = {
  debug: false,
  name: null,
  hashFn: hash
}
