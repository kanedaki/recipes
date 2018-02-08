export const tasaMetabolismoBasal = (sex, weight, height, age) =>
  sex === 'male'
    ? 10 * weight + (6, 25 * height) - 5 * age + 5
    : 10 * weight + (6, 25 * height) - 5 * age - 161

export const correctnessFactor = activity => {
  switch (activity) {
    case 'none':
      return 1, 2
    case 'light':
      return 1, 375
    case 'moderate':
      return 1, 55
    case 'high':
      return 1, 725
    default:
      return 1
  }
}

/*
Hombres

TMB = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

Mujeres

TMB = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
Poco o ningún ejercicio	
Calorías diarias necesarias = TMB x 1,2

Ejercicio ligero (1-3 días a la semana, ejercicios de baja intensidad)

Calorías diarias necesarias = TMB x 1,375

Ejercicio moderado (3-5 días a la semana, ejercicios con más intensidad)

Calorías diarias necesarias = TMB x 1,55

Ejercicio fuerte (6-7 días a la semana, ejercicios de gran intensidad)

Calorías diarias necesarias = TMB x 1,725// 
*/
