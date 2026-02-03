export function notReachable(value: never): never {
  console.error('Unexpected value in exhaustive check:', value)
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}
