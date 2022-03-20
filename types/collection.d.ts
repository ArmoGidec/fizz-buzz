export type Head<T extends number[]> = T extends [infer H, ...number[]]
  ? H
  : never;

export type Tail<T extends number[]> = T extends [number, ...infer R] ? R : [];
