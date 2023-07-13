/* _____________ Your Code Here _____________ */

type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[undefined]>, undefined>>
]

type errors = [
  // @ts-expect-error
  Last<'notArray'>,
  // @ts-expect-error
  Last<{ 0: 'arrayLike' }>
]
