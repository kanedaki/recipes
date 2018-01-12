export default [
  {
    lunch: {
      mealType: 'pasta',
      name: 'Espaguetis a lo pobre',
      ingredients: [
        { ingredient: 'Espaguetis', qty: { amount: 500, units: 'g' } },
        { ingredient: 'ajo', qty: { amount: 5 } },
        { ingredient: 'aceite' },
        { ingredient: 'Parmesano', qty: { amount: 100, units: 'g' } }
      ],
      steps: [
        'Cocer la pasta',
        'Sofreir ajos fuego medio, con la cayena',
        'Anadir los espaguetis, retirar del fuego y remover',
        'Rayar parmesano por encima'
      ]
    },
    dinner: {
      mealType: 'verduras',
      name: 'Judias verdes rehogadas',
      ingredients: [
        { ingredient: 'judias verdes', qty: { amount: 1, units: 'kg' } },
        { ingredient: 'tomate', qty: { amount: 3 } },
        { ingredient: 'cebolla', qty: { amount: 1 } },
        { ingredient: 'ajo', qty: { amount: 3 } },
        { ingredient: 'aceite' }
      ],
      steps: [
        'Pelar las judias verdes, trocear',
        'Cortar los tomates, cebolla y ajos en laminas',
        'Echar un buen chorro de aceite a la olla express y depositar capa por capa, tomate, cebolla, judias, ajo, 2 de cada. Con un chorro de aceite, sal y pimienta a mitad y al final',
        'Cocinar a fuego bajo, 10 minutos desde que la olla express esta a mitad de presion'
      ]
    }
  },
  {
    lunch: {
      mealType: 'legumbres',
      name: 'Lentejas guisadas',
      ingredients: [
        { ingredient: 'cebolla', qty: { amount: 1 } },
        { ingredient: 'Patatas', qty: { amount: 1 } },
        { ingredient: 'sal' },
        { ingredient: 'aceite' },
        { ingredient: 'Lentejas', qty: { amount: 1, units: 'kg' } },
        { ingredient: 'zanahoria', qty: { amount: 1 } },
        { ingredient: 'chorizo para guisar', qty: { amount: 1 } },
        { ingredient: 'Panceta', qty: { amount: 1, units: 'lonchas' } }
      ],
      steps: [
        'Poner las lentejas en agua, al menos 4 horas antes',
        'Cortar la panceta en trozos pequeños',
        'Saltear la panceta, reservar',
        'Cortar las verduras en trozos pequeños',
        'Hacer un sofrito con las verduras',
        'Añadir las lentejas, el chorizo, la panceta y cubrir con agua'
      ]
    },
    dinner: {
      mealType: 'pescado',
      name: 'Salmon con soja',
      ingredients: [
        {
          ingredient: 'Salsa de soja',
          qty: { amount: 25, units: 'ml' }
        },
        { ingredient: 'Eneldo' },
        {
          ingredient: 'salmon',
          qty: { amount: 2, units: 'lomos' },
          tip: 'sin piel'
        }
      ],
      steps: ['15 minutos al horno']
    }
  },
  {
    lunch: {
      mealType: 'arroz',
      name: 'Paella de verduras',
      ingredients: [
        { ingredient: 'sal' },
        { ingredient: 'aceite' },
        { ingredient: 'zanahoria', qty: { amount: 3 } },
        { ingredient: 'Alcachofas', qty: { amount: 4 } },
        { ingredient: 'Arroz', qty: { amount: 50, units: 'g' } }
      ],
      steps: ['Todo el mundo sabe como hacer paella']
    },
    dinner: {
      mealType: 'verduras',
      name: 'Coliflor gratinada',
      ingredients: [
        { ingredient: 'nata', qty: { amount: 100, units: 'ml' } },
        { ingredient: 'coliflor', qty: { amount: 1 } },
        { ingredient: 'leche', qty: { amount: 1, units: 'l' } },
        { ingredient: 'queso', qty: { amount: 100, units: 'g' } },
        { ingredient: 'mantequilla', qty: { amount: 150, units: 'g' } },
        { ingredient: 'harina', qty: { amount: 150, units: 'g' } },
        { ingredient: 'sal' },
        { ingredient: 'pimienta negra' },
        { ingredient: 'nuez moscada' }
      ],
      steps: [
        'Pelar, lavar y trocear la coliflor',
        'Cocer los trozos de coliflor 20 minutos',
        'Hacer la bechamel',
        'Poner en pirex la coliflor una vez escurrida. Echar la bechamel por encima',
        'Espolvorear queso rallado',
        'Gratinar al horno 10 minutos'
      ]
    }
  },
  {
    lunch: {
      mealType: 'verduras',
      name: 'Coliflor gratinada',
      ingredients: [
        { ingredient: 'nata', qty: { amount: 100, units: 'ml' } },
        { ingredient: 'coliflor', qty: { amount: 1 } },
        { ingredient: 'leche', qty: { amount: 1, units: 'l' } },
        { ingredient: 'queso', qty: { amount: 100, units: 'g' } },
        { ingredient: 'mantequilla', qty: { amount: 150, units: 'g' } },
        { ingredient: 'harina', qty: { amount: 150, units: 'g' } },
        { ingredient: 'sal' },
        { ingredient: 'pimienta negra' },
        { ingredient: 'nuez moscada' }
      ],
      steps: [
        'Pelar, lavar y trocear la coliflor',
        'Cocer los trozos de coliflor 20 minutos',
        'Hacer la bechamel',
        'Poner en pirex la coliflor una vez escurrida. Echar la bechamel por encima',
        'Espolvorear queso rallado',
        'Gratinar al horno 10 minutos'
      ]
    },
    dinner: {
      mealType: 'carne',
      name: 'Pollo guisado',
      ingredients: [
        { ingredient: 'cebolla', qty: { amount: 1 } },
        {
          ingredient: 'Pollo de corral',
          qty: { amount: 4, units: 'contramuslos' },
          tip: 'sin piel'
        },
        { ingredient: 'Caldo de pollo', qty: { amount: 1, units: 'l' } }
      ],
      steps: ['Guisar todo junto']
    }
  },
  {
    lunch: {
      mealType: 'legumbres',
      name: 'Lentejas guisadas',
      ingredients: [
        { ingredient: 'cebolla', qty: { amount: 1 } },
        { ingredient: 'Patatas', qty: { amount: 1 } },
        { ingredient: 'sal' },
        { ingredient: 'aceite' },
        { ingredient: 'Lentejas', qty: { amount: 1, units: 'kg' } },
        { ingredient: 'zanahoria', qty: { amount: 1 } },
        { ingredient: 'chorizo para guisar', qty: { amount: 1 } },
        { ingredient: 'Panceta', qty: { amount: 1, units: 'lonchas' } }
      ],
      steps: [
        'Poner las lentejas en agua, al menos 4 horas antes',
        'Cortar la panceta en trozos pequeños',
        'Saltear la panceta, reservar',
        'Cortar las verduras en trozos pequeños',
        'Hacer un sofrito con las verduras',
        'Añadir las lentejas, el chorizo, la panceta y cubrir con agua'
      ]
    },
    dinner: {
      mealType: 'arroz',
      name: 'Paella de verduras',
      ingredients: [
        { ingredient: 'sal' },
        { ingredient: 'aceite' },
        { ingredient: 'zanahoria', qty: { amount: 3 } },
        { ingredient: 'Alcachofas', qty: { amount: 4 } },
        { ingredient: 'Arroz', qty: { amount: 50, units: 'g' } }
      ],
      steps: ['Todo el mundo sabe como hacer paella']
    }
  }
]
