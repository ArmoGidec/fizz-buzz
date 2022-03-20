import { Div, Sum } from './operations';
import { EQ, LT } from './operators';

type _Mod<T extends number, K extends number, P extends number = 0> = LT<
  P,
  T
> extends true
  ? _Mod<T, K, Sum<P, K>>
  : EQ<T, P> extends true
  ? 0
  : Div<T, Div<P, K>>;

export type Mod<T extends number, K extends number> = _Mod<T, K>;
