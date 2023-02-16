export type NotNull = string | number | boolean | object | Function | bigint | Symbol;
export type KeyValuePair<Value = NotNull> = { [key: string]: Value; }