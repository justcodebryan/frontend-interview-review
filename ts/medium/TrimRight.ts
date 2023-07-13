/* _____________ Your Code Here _____________ */

type Space = ' ' | '\n' | '\t'
type TrimRight<S extends string> = S extends `${infer R}${Space}`
  ? TrimRight<R>
  : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<' str'>, ' str'>>,
  Expect<Equal<TrimRight<'     str'>, '     str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   \n\t foo bar '>, '   \n\t foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<' \n\t'>, ''>>
]
