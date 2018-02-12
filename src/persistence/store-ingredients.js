import fs from 'fs'
import { curry } from 'ramda'

const extractIngredientInfo = curry((category, subcategory, [name, { calories, nutritional }]) => {
  console.log(name, calories, nutritional)
  // Insert into db
})

function storeIngredients() {
  const nutritionalInfo = JSON.parse(fs.readFileSync('src/enums/ingredients/ingredients-info-tree.json', 'utf8'))
  let currentCategory
  let currentSubcategory
  nutritionalInfo.forEach((firstLevel) => {
    firstLevel.forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((secondLevel) => {
          secondLevel.forEach((subcategory) => {
            if (Array.isArray(subcategory)) {
              subcategory.forEach(extractIngredientInfo(currentCategory, currentSubcategory))
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
