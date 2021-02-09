import { DJBHash } from './DJBHash'

const hashBuilder = new DJBHash()

export function hash (args: any[]): number {
  const str = JSON.stringify(args)

  return hashBuilder.makeHash(str)
}
