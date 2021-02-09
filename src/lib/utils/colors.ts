const ESCAPE_CODE = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m'
}

export function bold (str: string): string {
  const { BRIGHT, RESET } = ESCAPE_CODE

  return `${ BRIGHT }${ str }${ RESET }`
}

export function green (str: string): string {
  const { GREEN, RESET } = ESCAPE_CODE

  return `${ GREEN }${ str }${ RESET }`
}

export function yellow (str: string): string {
  const { YELLOW, RESET } = ESCAPE_CODE

  return `${ YELLOW }${ str }${ RESET }`
}

export function blue (str: string): string {
  const { BLUE, RESET } = ESCAPE_CODE

  return `${ BLUE }${ str }${ RESET }`
}
