import { Div } from './operations';

export type LT<T extends number, K extends number> = Div<T, K> extends never
  ? true
  : false;

export type GT<T extends number, K extends number> = Div<K, T> extends never
  ? true
  : false;

export type EQ<T extends number, K extends number> = LT<T, K> extends false
  ? GT<T, K> extends false
    ? true
    : false
  : false;
