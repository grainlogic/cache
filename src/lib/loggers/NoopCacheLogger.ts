import { CacheLogger } from '../interfaces'

export class NoopCacheLogger implements CacheLogger {
  public log (message: string): void {}
}
