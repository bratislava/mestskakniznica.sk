export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export type WithRequired<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: NonNullable<Type[Property]>
}
