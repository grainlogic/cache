import { CacheLogger } from '../interfaces'

import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import DateTimeFormat = Intl.DateTimeFormat

export class ConsoleCacheLogger implements CacheLogger {

  public static dateTimeFormatOptions: DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }

  public static locales: string | Array<string> = 'en-US'

  public static get formatter (): DateTimeFormat {
    if (this._formatter !== undefined) {
      return this._formatter
    }

    this._formatter = new DateTimeFormat(this.locales, this.dateTimeFormatOptions)

    return this._formatter
  }

  private static _formatter: DateTimeFormat

  readonly #scope: string

  public constructor (scope: string) {
    this.#scope = scope
  }

  public log (message: string): void {
    const time = ConsoleCacheLogger.formatter.format(new Date())

    console.log(`${ time } [${ this.#scope }] ${ message }`)
  }
}
