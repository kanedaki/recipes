import { matchMealType, matchMeal } from '../recipes'

export function match(menu, template) {
  if (menu.length !== template.length) return false
  return menu.every(({ lunch, dinner }, index) => {
    const { lunch: lunchMealType, dinner: dinnerMealType } = template[index]
    return (
      matchMealType({ mealType: lunchMealType })(lunch) &&
      matchMealType({ mealType: dinnerMealType })(dinner)
    )
  })
}
