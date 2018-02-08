import {
  grasasVegetales,
  hortalizas,
  grasasAnimales,
  cereales,
  condimentos,
  tuberculos,
  lacteos,
  legumbres,
  sales,
  frutas,
  pasta,
  semillas,
  frutosSecos,
  pescado,
  azucares,
} from '../ingredientTypes'

export const harina = { name: 'Harina', type: cereales }
export const pan = { name: 'Pan', type: cereales }
export const arrozBlanco = { name: 'Arroz', type: cereales }
export const espelta = { name: 'Espelta', type: cereales }
export const avena = { name: 'Avena', type: cereales }
export const couscous = { name: 'Cous cous', type: cereales }
export const maiz = { name: 'Maiz', type: cereales }

export const pipasCalabaza = { name: 'Pipas de calabaza', type: semillas }
export const quinoa = { name: 'Quinoa', type: semillas }
export const sesamo = { name: 'Sesamo', type: semillas }
export const pipasGirasol = { name: 'Pipas de girasol', type: semillas }

export const espaguetis = { name: 'Espaguetis', type: pasta }

export const cebolla = { name: 'cebolla', type: hortalizas }
export const ajo = { name: 'ajo', type: hortalizas }
export const salsaTomate = {
  name: 'Salsa de tomate',
  type: hortalizas,
  gama: 2,
}

export const zanahoria = { name: 'zanahoria', type: tuberculos }
export const patata = { name: 'Patatas', type: tuberculos }

export const aceitunas = { name: 'Aceitunas', type: frutas }

export const almendras = { name: 'Almendras', type: frutosSecos }
export const nueces = { name: 'Nueces', type: frutosSecos }
export const piñones = { name: 'Piñones', type: frutosSecos }
export const nuecesMacadamia = {
  name: 'Nueces de macadamia',
  type: frutosSecos,
}
export const avellanas = { name: 'Avellanas', type: frutosSecos }
export const castañas = { name: 'Castañas', type: frutosSecos }
export const anacardos = { name: 'Anacardos', type: frutosSecos }

export const aceite = { name: 'aceite', type: grasasVegetales }
export const mantequilla = { name: 'mantequilla', type: grasasAnimales }

export const lataAtun = { name: 'Lata de atun', type: pescado, gama: 2 }

export const garbanzos = { name: 'Garbanzos', type: legumbres }
export const judiasPintas = { name: 'Judias Pintas', type: legumbres }
export const judiasBlancas = { name: 'Judias Blancas', type: legumbres }
export const lentejas = { name: 'Lentejas', type: legumbres }

export const caldoPollo = { name: 'Caldo de pollo', type: condimentos }
export const salsaSoja = { name: 'Salsa de soja', type: condimentos }
export const eneldo = { name: 'Eneldo', type: condimentos }
export const cayena = { name: 'Pimienta de cayena', type: condimentos }
export const pimenton = { name: 'Pimenton', type: condimentos }
export const pimientaNegra = { name: 'pimienta negra', type: condimentos }
export const nuezMoscada = { name: 'nuez moscada', type: condimentos }
export const vinagre = { name: 'vinagre', type: condimentos }
export const vinagreArroz = { name: 'Vinagre de arroz', type: condimentos }
export const algaNori = { name: 'Alga nori', type: condimentos }

export const leche = { name: 'leche', type: lacteos }

export const sal = { name: 'sal', type: sales }

export const azucar = { name: 'azucar', type: azucares }