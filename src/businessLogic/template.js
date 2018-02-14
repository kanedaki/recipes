export const numberOfMeals = template =>
  template.reduce((meals, day) => meals + Object.keys(day).length, 0)
