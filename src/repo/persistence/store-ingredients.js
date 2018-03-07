import fs from 'fs'
import { curry } from 'ramda'
import connectToDB from '../mongo-repo'

const NA = Symbol.for('NA')

const getProp = (group, name) => {
  const prop = group.data.find(info => info.name === name)
  return {
    value: prop.value || NA,
    unit: prop.unit || NA,
  }
}

const getAllProps = group => group.data.map(prop => ({
  name: prop.name,
  value: prop.value || NA,
  unit: prop.unit || NA,
}))

const parseGeneral = ([macroData, mineralsData, vitaminsData]) => {
  const calories = getProp(macroData, 'Energía')
  const macro = {
    protein: getProp(macroData, 'Proteína'),
    carbohydrates: getProp(macroData, 'Hidratos carbono'),
    fat: getProp(macroData, 'Grasa total'),
    fiber: getProp(macroData, 'Fibra'),
    AGS: getProp(macroData, 'AGS'),
    AGM: getProp(macroData, 'AGM'),
    AGP: getProp(macroData, 'AGP'),
    colesterol: getProp(macroData, 'Colesterol'),
    alcohol: getProp(macroData, 'Alcohol'),
    water: getProp(macroData, 'Agua'),
  }
  const micro = {
    minerals: getAllProps(mineralsData),
    vitamins: getAllProps(vitaminsData),
  }
  return { calories, macro, micro }
}

const parseDetail = ([fatAcidsData, aminoacidsData, carbohydratesData]) => {
  const fatAcids = getAllProps(fatAcidsData)
  const aminoacids = getAllProps(aminoacidsData)
  const [simples, organics, phytosterols, notAvailable] = carbohydratesData.data
  const carbohydrates = {
    simples: getAllProps(simples),
    organics: getAllProps(organics),
    phytosterols: getAllProps(phytosterols),
    notAvailable: getAllProps(notAvailable),
  }
  return { fatAcids, aminoacids, carbohydrates }
}


const parseInfo = (general, detail) => {
  const { calories, macro, micro } = parseGeneral(general)
  const { fatAcids, aminoacids, carbohydrates } = parseDetail(detail)
  return {
    general: { calories, macro, micro },
    detail: { fatAcids, aminoacids, carbohydrates },
  }
}

const storeIngredientInfo =
  curry(async (db, category, subcategory, [name, { calories, nutritional }]) => {
    const info = parseInfo(calories, nutritional)
    return db.insertIngredient(category, subcategory, name, info)
  })

async function storeIngredients() {
  const db = await connectToDB()
  const nutritionalInfo = JSON.parse(fs.readFileSync('src/repo/persistence/ingredients-info-tree.json', 'utf8'))
  let currentCategory
  let currentSubcategory
  nutritionalInfo.forEach((firstLevel) => {
    firstLevel.forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((secondLevel) => {
          secondLevel.forEach((subcategory) => {
            if (Array.isArray(subcategory)) {
              subcategory.forEach(storeIngredientInfo(db, currentCategory, currentSubcategory))
            } else {
              currentSubcategory = subcategory
            }
          })
        })
      } else {
        currentCategory = category
      }
    })
  })
}


storeIngredients()
