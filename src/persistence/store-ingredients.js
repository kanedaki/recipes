import fs from 'fs'
import { curry } from 'ramda'
import { MongoClient } from 'mongodb'

const extractIngredientInfo = curry((db, category, subcategory, [name, { calories, nutritional }]) => {
  const collection = db.collection('ingredients')
  collection.insertMany([{ name, calories, nutritional }])
  // Insert into db
})

function connectToDB() {
  const url = 'mongodb://localhost:27017'
  const dbName = 'recipes'
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) reject(err)
      console.log('Connected successfully to server')
      resolve(client.db(dbName))
    })
  })
}

function storeIngredients(db) {
  const nutritionalInfo = JSON.parse(fs.readFileSync('src/enums/ingredients/ingredients-info-tree.json', 'utf8'))
  let currentCategory
  let currentSubcategory
  nutritionalInfo.forEach((firstLevel) => {
    firstLevel.forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((secondLevel) => {
          secondLevel.forEach((subcategory) => {
            if (Array.isArray(subcategory)) {
              subcategory.forEach(extractIngredientInfo(db, currentCategory, currentSubcategory))
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


connectToDB()
  .then(db => storeIngredients(db))
