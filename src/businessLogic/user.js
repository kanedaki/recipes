import { macronutrientsAveragePercentage } from './constraints/nutrients'
import { none, light, moderate, high } from './enums/activity'

const tasaMetabolismoBasal = ({
  sex, weight, height, age,
}) =>
  (sex === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161)

const activityFactor = (activity) => {
  switch (activity) {
    case none:
      return 1.2
    case light:
      return 1.375
    case moderate:
      return 1.55
    case high:
      return 1.725
    default:
      return 1
  }
}

export const dayCalories = ({ activity, ...user }) =>
  activityFactor(activity) + tasaMetabolismoBasal(user)

export const dayPercentageNutrients = user => macronutrientsAveragePercentage(user)
