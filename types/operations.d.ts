type Arr = [...unknown[]];
export type Append<T extends Arr> = [...T, T['length']];

export type Pop<T extends Arr> = T extends [...infer K, unknown] ? K : never;

export type ArrToNum<T extends Arr> = T['length'];

type _NumToArr<T extends number, K extends Arr = []> = ArrToNum<K> extends T
? K
: _NumToArr<T, Append<K>>;
export type NumToArr<T extends number> = _NumToArr<T>;

type Op<T extends number, O extends 'Append' | 'Pop', K = NumToArr<T>, P = K extends Arr ? {
  Append: Append<K>,
  Pop: Pop<K>
}[O] : never> = P extends Arr ? ArrToNum<P> : never;

export type Inc<T extends number> = Op<T, 'Append'>;
export type Dec<T extends number> = Op<T, 'Pop'>;

export type Sum<T extends number, K extends number> = K extends 0 ? T : Sum<Inc<T>, Dec<K>>;
export type Div<T extends number, K extends number> = K extends 0 
  ? T 
  : Dec<T> extends never
    ? never
    : Dec<K> extends never
      ? never
      : Div<Dec<T>, Dec<K>>;