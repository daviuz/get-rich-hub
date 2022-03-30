export const priceModifier = () => {
  let toDollars = value => `${value < 0 ? '-' : ''}$${Math.abs(value)}`

  return { toDollars }
}
