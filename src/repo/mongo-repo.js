import { MongoClient, ObjectId } from 'mongodb'
import {
  partial,
  pathOr,
  compose,
  map,
  flatten,
  difference,
  uniq,
} from 'ramda'

/* *************************** Ingredients ********************* */

const findIngredient = async (db, name) => {
  const [
    ingredient,
  ] = await db.collection('ingredients').find({ name }).project({ _id: 0 }).toArray()
  return ingredient
}

const insertIngredient = async (db, category, subcategory, name, info) =>
  db
    .collection('ingredients')
    .insertMany([{
      name,
      category,
      subcategory,
      ...info,
    }])

const insertIngredientOnlyWithName = async (db, name) => {
  const ingredient =
  {
    name,
    general: {
      calories: {
        unit: 'Kcal'
      },
      macro: {
        protein: {
          unit: 'g'
        },
        carbohydrates: {
          unit: 'g'
        },
        fat: {
          unit: 'g'
        },
        fiber: {
          unit: 'g'
        },
        AGS: {
          unit: 'g'
        },
        AGM: {
          unit: 'g'
        },
        AGP: {
          unit: 'g'
        },
        colesterol: {
          unit: 'mg'
        },
        alcohol: {
          unit: 'g'
        },
        water: {
          unit: 'g'
        }
      },
      micro: {
        minerals: [
          {
            name: 'Calcio',
            unit: 'mg'
          },
          {
            name: 'Hierro',
            unit: 'mg'
          },
          {
            name: 'Yodo',
            value: 1,
            unit: 'mg'
          },
          {
            name: 'Magnesio',
            unit: 'mg'
          },
          {
            name: 'Zinc',
            unit: 'mg'
          },
          {
            name: 'Selenio',
            unit: 'µg'
          },
          {
            name: 'Sodio',
            unit: 'mg'
          },
          {
            name: 'Potasio',
            unit: 'mg'
          },
          {
            name: 'Fósforo',
            unit: 'mg'
          }
        ],
        vitamins: [
          {
            name: 'Vit. B1 Tiamina',
            unit: 'mg'
          },
          {
            name: 'Vit. B2 Riboflavina',
            unit: 'mg'
          },
          {
            name: 'Eq. niacina',
            unit: 'mg'
          },
          {
            name: 'Vit. B6 Piridoxina',
            unit: 'mg'
          },
          {
            name: 'Ac. Fólico',
            unit: 'µg'
          },
          {
            name: 'Vit. B12 Cianocobalamina',
            unit: 'µg'
          },
          {
            name: 'Vit. C Ac. ascórbico',
            unit: 'mg'
          },
          {
            name: 'Retinol',
            unit: 'µg'
          },
          {
            name: 'Carotenoides (Eq. β carotenos)',
            unit: 'µg'
          },
          {
            name: 'Vit. A Eq. Retincl',
            unit: 'µg'
          },
          {
            name: 'Vit. D',
            unit: 'µg'
          }
        ]
      }
    },
    detail: {
      fatAcids: [
        {
          name: 'Mirístico C14:0',
          unit: 'g'
        },
        {
          name: 'Palmítico C16:0',
          unit: 'g'
        },
        {
          name: 'Esteárico C18:0',
          unit: 'g'
        },
        {
          name: 'Omega 3',
          unit: 'g'
        },
        {
          name: 'Ac. Grasos cis'
        },
        {
          name: 'AGP cis'
        },
        {
          name: 'Palmitoleico C16:1',
          unit: 'g'
        },
        {
          name: 'Oleico C18:1',
          unit: 'g'
        },
        {
          name: 'Linoleico C18:2',
          unit: 'g'
        },
        {
          name: 'Linolénico C18:3',
          unit: 'g'
        },
        {
          name: 'Omega 6',
          unit: 'g'
        },
        {
          name: 'Ac. Grasos trans'
        },
        {
          name: 'AGM trans'
        },
        {
          name: 'Araquidónico C20:4',
          unit: 'g'
        },
        {
          name: 'Eicosapentaenoico C20:5',
          unit: 'g'
        },
        {
          name: 'Docosapentaenoico C22:5',
          unit: 'g'
        },
        {
          name: 'Docosahexaenoico C22:6',
          unit: 'g'
        },
        {
          name: 'Omega 3/ Omega 6'
        },
        {
          name: 'AGM cis'
        },
        {
          name: 'AGP trans'
        }
      ],
      aminoacids: [
        {
          name: 'Alanina',
          unit: 'mg'
        },
        {
          name: 'Arginina',
          unit: 'mg'
        },
        {
          name: 'Ac. aspártico',
          unit: 'mg'
        },
        {
          name: 'Ac. glutámico',
          unit: 'mg'
        },
        {
          name: 'Cistina',
          unit: 'mg'
        },
        {
          name: 'Fenilalanina',
          unit: 'mg'
        },
        {
          name: 'Glicina',
          unit: 'mg'
        },
        {
          name: 'Histidina',
          unit: 'mg'
        },
        {
          name: 'Isoleucina',
          unit: 'mg'
        },
        {
          name: 'Leucina',
          unit: 'mg'
        },
        {
          name: 'Lisina',
          unit: 'mg'
        },
        {
          name: 'Metionina',
          unit: 'mg'
        },
        {
          name: 'Hidroxiprolina',
          unit: 'mg'
        },
        {
          name: 'Prolina',
          unit: 'mg'
        },
        {
          name: 'Serina',
          unit: 'mg'
        },
        {
          name: 'Tirosina',
          unit: 'mg'
        },
        {
          name: 'Treonina',
          unit: 'mg'
        },
        {
          name: 'Triptófano',
          unit: 'mg'
        },
        {
          name: 'Valina',
          unit: 'mg'
        }
      ],
      carbohydrates: {
        simples: [
          {
            name: 'Glucosa',
            unit: 'g'
          },
          {
            name: 'Fructosa',
            unit: 'g'
          },
          {
            name: 'Galactosa',
            unit: 'g'
          },
          {
            name: 'Sacarosa',
            unit: 'g'
          },
          {
            name: 'Lactosa',
            unit: 'g'
          },
          {
            name: 'Maltosa',
            unit: 'g'
          },
          {
            name: 'Oligosacáridos',
            unit: 'g'
          }
        ],
        organics: [
          {
            name: 'Ac. orgánicos disponibles',
            unit: 'g'
          },
          {
            name: 'Oxálico',
            unit: 'g'
          },
          {
            name: 'Cítrico',
            unit: 'g'
          },
          {
            name: 'Málico',
            unit: 'g'
          },
          {
            name: 'Ac. Tartárico',
            unit: 'g'
          },
          {
            name: 'Ac. Acético',
            unit: 'g'
          },
          {
            name: 'Ac. Láctico',
            unit: 'g'
          }
        ],
        phytosterols: [
          {
            name: 'Fitosteroles totales',
            unit: 'mg'
          },
          {
            name: 'Beta-sitosterol',
            unit: 'mg'
          },
          {
            name: 'Campesterol',
            unit: 'mg'
          },
          {
            name: 'Estigmasterol',
            unit: 'mg'
          },
          {
            name: 'Estigmasterol D7',
            unit: 'mg'
          },
          {
            name: 'Brásica-esterol',
            unit: 'mg'
          },
          {
            name: 'Avenaesterol D5',
            unit: 'mg'
          },
          {
            name: 'Avenaesterol D7',
            unit: 'mg'
          },
          {
            name: 'Otros fitosteroles',
            unit: 'mg'
          }
        ],
        notAvailable: [
          {
            name: 'Polisac. no celu.solubles',
            unit: 'g'
          },
          {
            name: 'Polisac. no celu. insolubles',
            unit: 'g'
          },
          {
            name: 'Celulosa',
            unit: 'g'
          },
          {
            name: 'Lignina',
            unit: 'g'
          },
          {
            name: 'Almidón',
            unit: 'g'
          }
        ]
      }
    }
  }
  db.collection('ingredients').insertOne(ingredient)
}

const findIngredients = async (db, ingredients = []) =>
  db
    .collection('ingredients')
    .find({
      name: { $in: ingredients },
    })
    .toArray()

// const getIngredients = db => db.collection('ingredients').find({}).project({ _id: 0 }).toArray()
const getIngredients = db => db.collection('ingredients').aggregate([
  {
    $project: {
      name: 1,
      category: 1,
      subcategory: 1,
      calories: '$general.calories',
    }
  }
]).toArray()

const getIngredientsNum = db => db.collection('ingredients').count()

const getIngredientsWithPagination = (db, _end, _order, _sort, _start) => {
  const numFields = _end - _start
  const orderSort = _order === 'DESC' ? -1 : 1

  return db.collection('ingredients').aggregate([
    { $sort: { [_sort]: orderSort } },
    { $skip: Number(_start) },
    { $limit: numFields },
    {
      $project:
        {
          name: 1,
          category: 1,
          subcategory: 1,
          calories: '$general.calories',
        }
    }
  ]).toArray()
}

const getIngredientById = (db, id) => db.collection('ingredients').aggregate([
  {
    $match: { _id: ObjectId(`${id}`) }
  },
  {
    $project: {
      name: 1,
      category: 1,
      subcategory: 1,
      general: 1,
      detail: 1,
    }
  }
]).toArray()

const getNumIngredientsWithTheName = (db, name) => db.collection('ingredients').find({ name }).count()

const updateIngredientById = (db, id, ingredient) => db.collection('ingredients').update(
  { _id: ObjectId(`${id}`) }, ingredient)

const deleteIngredientById = (db, id) => db.collection('ingredients').remove({ _id: ObjectId(`${id}`) })

const insertIngredients = async (db, ingredients = []) => {
  const existingIngredients = (await findIngredients(db, ingredients))
    .map(({ name }) => name)
  const newIngredients = difference(ingredients, existingIngredients)
    .map(name => ({ name, validationPending: true }))
  return newIngredients.length &&
    db
      .collection('ingredients')
      .insert(newIngredients)
}

/* *************************** Recipes ********************* */

const getRecipe = (db, name) => db.collection('recipes').findOne({ name }, { _id: 0 })

const getRecipeById = (db, id) => db.collection('recipes').findOne({ _id: ObjectId(`${id}`) })

const updateRecipe = async (db, recipe) => db.collection('recipes').update(
  { name: recipe.name },
  recipe,
)

const updateRecipeById = (db, id, recipe) => db.collection('recipes').update(
  { _id: ObjectId(`${id}`) }, recipe)

// const getUserRecipes = db => db.collection('recipes').find({}).project({ _id: 0 }).toArray()
const getUserRecipes = db => db.collection('recipes').aggregate([
  {
    $project: {
      id: '$_id',
      _id: 0,
      name: 1,
    }
  }
]).toArray()

const getRecipesNum = db => db.collection('recipes').count()

const getRecipesWithPagination = (db, _end, _order, _sort, _start) => {
  const numFields = _end - _start
  const orderSort = _order === 'DESC' ? -1 : 1

  return db.collection('recipes').aggregate([
    { $sort: { [_sort]: orderSort } },
    { $skip: Number(_start) },
    { $limit: numFields },
    {
      $project: {
        name: 1,
        ingredients: 1,
        meal: 1,
        seasons: 1
      }
    }
  ]).toArray()
}

const insertRecipes = (db, recipes) => db.collection('recipes').insertMany(recipes)

const insertRecipe = (db, recipe) => db.collection('recipes').insertOne(recipe)

const insertRecipesWithIngredients = async (db, recipes) => {
  const extractIngredientNames = compose(
    uniq,
    map(pathOr(undefined, ['ingredient'])),
    flatten,
    map(pathOr([], ['ingredients'])),
  )
  insertIngredients(db, extractIngredientNames(recipes))
  return insertRecipes(db, recipes)
}

/* *************************** User ********************* */
const getUser = (db, username) => db.collection('users').findOne({ username }, { _id: 0, password: 0 })

const insertUser = (db, username, password, email) => db.collection('users').insertOne({ username, password, email })
const updateUser = (db, username, user) => db.collection('users').update({ username }, { $set: user })

const getUserSettings = (db, username) => db.collection('userSettings').findOne({ username }, { _id: 0 }) || {}

const insertUserSettings = (db, username, settings) => db.collection('userSettings').insertOne({ username, ...settings })

const insertUserMenu = (db, username, menu) => db.collection('userMenus').insertOne({ username, menu })

const getUserMenu = async (db, username) => {
  const userMenus = await db.collection('userMenus').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'menu'], userMenus)
}

const insertUserShoppingList = (db, username, list) => db.collection('userShoppingList').insertOne({ username, list })

const getUserShoppingList = async (db, username) => {
  const userList = await db.collection('userShoppingList').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr([], [0, 'list'], userList)
}

const insertMenuIntoLog = (db, username, menu) => db.collection('LogMenus').insertOne({ username, menu, createdAt: new Date() })

const insertNutrientsIntoLog = (db, username, nutrients) => db.collection('LogNutrients').insertOne({ username, nutrients, createdAt: new Date() })

const getUserNutrientsBalance = async (db, username) => {
  const userBalances = await db.collection('userNutrientsBalance').find({ username }).sort({ _id: -1 }).limit(1)
    .toArray()
  return pathOr(undefined, [0, 'balance'], userBalances)
}

const insertUserNutrientsBalance = (db, username, balance) => db.collection('userNutrientsBalance').insertOne({ username, balance })

export default async function connectToDB() {
  const url = 'mongodb://localhost:27017'
  const dbName = 'recipes'
  const db = await MongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully to server')
      return client.db(dbName)
    })
    .catch(err => console.log('Error connecting db', err))
  return {
    findIngredient: partial(findIngredient, [db]),
    insertIngredient: partial(insertIngredient, [db]),
    getRecipe: partial(getRecipe, [db]),
    updateRecipe: partial(updateRecipe, [db]),
    getUserRecipes: partial(getUserRecipes, [db]),
    getRecipesWithPagination: partial(getRecipesWithPagination, [db]),
    getRecipesNum: partial(getRecipesNum, [db]),
    getRecipeById: partial(getRecipeById, [db]),
    updateRecipeById: partial(updateRecipeById, [db]),
    insertRecipes: partial(insertRecipes, [db]),
    insertRecipe: partial(insertRecipe, [db]),
    getUser: partial(getUser, [db]),
    insertUser: partial(insertUser, [db]),
    getUserSettings: partial(getUserSettings, [db]),
    insertUserSettings: partial(insertUserSettings, [db]),
    updateUser: partial(updateUser, [db]),
    getUserMenu: partial(getUserMenu, [db]),
    insertUserMenu: partial(insertUserMenu, [db]),
    getUserShoppingList: partial(getUserShoppingList, [db]),
    insertUserShoppingList: partial(insertUserShoppingList, [db]),
    insertMenuIntoLog: partial(insertMenuIntoLog, [db]),
    insertNutrientsIntoLog: partial(insertNutrientsIntoLog, [db]),
    getUserNutrientsBalance: partial(getUserNutrientsBalance, [db]),
    insertUserNutrientsBalance: partial(insertUserNutrientsBalance, [db]),
    insertRecipesWithIngredients: partial(insertRecipesWithIngredients, [db]),
    getIngredients: partial(getIngredients, [db]),
    getIngredientsNum: partial(getIngredientsNum, [db]),
    getIngredientsWithPagination: partial(getIngredientsWithPagination, [db]),
    getIngredientById: partial(getIngredientById, [db]),
    updateIngredientById: partial(updateIngredientById, [db]),
    deleteIngredientById: partial(deleteIngredientById, [db]),
    getNumIngredientsWithTheName: partial(getNumIngredientsWithTheName, [db]),
    insertIngredientOnlyWithName: partial(insertIngredientOnlyWithName, [db]),
  }
}
