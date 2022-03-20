import { Inc } from './operations';
import { Tail, Head } from './collection';
import { Mod } from './mod';
import { EQ } from './operators';

type FizzOrBuzzOrNum<T extends number> = EQ<Mod<T, 15>, 0> extends true
  ? 'FizzBuzz'
  : EQ<Mod<T, 5>, 0> extends true
  ? 'Buzz'
  : EQ<Mod<T, 3>, 0> extends true
  ? 'Fizz'
  : T;

type _FizzBuzz<
T extends number[],
K extends (number | string)[] = []
> = T extends []
? K
: Head<T> extends number
? _FizzBuzz<Tail<T>, [...K, FizzOrBuzzOrNum<Inc<Head<T>>>]>
: never;
  
export type FizzBuzz<T extends number[]> = _FizzBuzz<T>;
