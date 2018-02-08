// UL:Tolerable Upper Intake levels
// RDA: Recommended dietary allowances and Adequate Intakes
const ALAP = Symbol.for('As low as possible')
// const ND = Symbol.for('Not determined')

export const water = { rda: () => 3.7 }

export const macronutrients = {
  fiber: { rda: () => 38 },
  carbohydrates: {
    percentage: () => ({
      min: 45,
      max: 65,
    }),
    rda: 130,
  },
  fat: () => ({
    min: 20,
    max: 35,
  }),
  protein: {
    percentage: () => ({
      min: 10,
      max: 35,
    }),
    rda: ({ sex }) => (sex === 'male' ? 56 : 46),
  },
}

export const protein = {
  vegetal: { percentage: { min: 66 } },
  animal: { percentage: { max: 33 } },
}

export const fats = {
  colesterol: { max: () => ({ amount: 300, units: 'mg' }) },
  poliunsaturated: { percentage: { min: 10 } },
  monounsaturated: { percentage: { min: 50 } },
  saturated: ALAP,
  trans: ALAP,
}

export const fiber = {
  soluble: { rda: { max: 50 } },
  unsoluble: { rda: { min: 50 } },
}

export const sugars = {
  addedSugars: { max: () => ({ amount: 10, units: '%' }) },
}

// Micronutrients
export const minerals = {
  arsenic: { ul: 0, units: 'mg' },
  borom: { ul: 20, units: 'mg' },
  calcium: { ul: 2500, rda: 1000, units: 'mg' },
  chromium: { rda: 35, units: 'ug' },
  copper: { ul: 10000, rda: 900, units: 'ug' },
  fluoride: { ul: 10, rda: 4, units: 'mg' },
  iodine: { ul: 1100, rda: 150, units: 'ug' },
  iron: { ul: 45, rda: 8, units: 'mg' },
  magnesium: { rda: 420, units: 'mg' },
  manganese: { ul: 11, rda: 2.3, units: 'mg' },
  molybdenum: { ul: 2000, rda: 45, units: 'ug' },
  nikel: { ul: 1, units: 'mg' },
  phosphorus: { ul: 4000, rda: 700, units: 'mg' },
  selenium: { ul: 400, rda: 55, units: 'ug' },
  vanadium: { ul: 1.8, units: 'mg' },
  zinc: { ul: 40, rda: 11, units: 'mg' },
  potasium: { rda: 4.7, units: 'g' },
  sodium: { ul: 2.3, rda: 1.5, units: 'g' },
  chloride: { ul: 3.6, rda: 2.3, units: 'g' },
}

export const vitamins = {
  A: () => ({
    ul: 3000,
    rda: 900,
    units: 'ug',
    name: 'retinol',
    soluble: 'fat',
  }),
  C: () => ({
    ul: 2000,
    rda: 90,
    units: 'mg',
    name: 'acido ascorbico',
    soluble: 'water',
  }),
  D: () => ({
    ul: 100,
    rda: 15,
    units: 'ug',
    name: 'calciferol',
    soluble: 'fat',
  }),
  E: () => ({
    ul: 1000,
    rda: 15,
    units: 'mg',
    name: 'tocoferol',
    soluble: 'fat',
  }),
  K: () => ({
    rda: 80,
    units: 'ug',
    name: 'antihemorragica',
    soluble: 'fat',
  }),
  B1: () => ({
    rda: 1200, units: 'ug', name: 'Tiamina', soluble: 'water',
  }),
  B2: () => ({
    rda: 1200, units: 'ug', name: 'Riboflavina', soluble: 'water',
  }),
  B3: () => ({
    ul: 35000,
    rda: 15,
    units: 'mg',
    name: 'Niacina',
    soluble: 'water',
  }),
  B5: () => ({
    rda: 5,
    units: 'mg',
    name: 'Acido pantoteico',
    soluble: 'water',
  }),
  B6: () => ({
    ul: 100000,
    rda: 1400,
    units: 'ug',
    name: 'Piroxidina',
    soluble: 'water',
  }),
  B9: () => ({
    ul: 1000,
    rda: 400,
    units: 'ug',
    name: 'Acido folico',
    soluble: 'water',
  }),
  B12: () => ({
    rda: 2.4, units: 'ug', name: 'Cobalamina', soluble: 'water',
  }),
  inositol: () => ({
    rda: { min: 50, max: 500 },
    units: 'mg',
    name: 'inositol',
  }),
  colina: () => ({
    rda: { min: 425, max: 550 },
    ul: 3500,
    units: 'mg',
    name: 'colina',
  }),
}
