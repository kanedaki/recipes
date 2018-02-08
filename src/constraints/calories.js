export const tasaMetabolismoBasal = ({ sex, weight, height, age }) =>
  sex === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161

export const activityFactor = activity => {
  switch (activity) {
    case 'none':
      return 1.2
    case 'light':
      return 1.375
    case 'moderate':
      return 1.55
    case 'high':
      return 1.725
    default:
      return 1
  }
}
