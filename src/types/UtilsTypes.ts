export type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from T
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
/*  eslint-disable-next-line @typescript-eslint/no-type-alias */
export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
/*  eslint-disable-next-line @typescript-eslint/no-type-alias */

export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export type Fn = (...arg: any[]) => any;
export type MaybePromise<T> = Promise<T> | T;


export type AnyObject = {
  [key: string]: any;
};