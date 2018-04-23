import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import { Edit, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput, SelectArrayInput } from 'admin-on-rest'

import { RecipeTitle } from './components/RecipeTitle'
import { RecipeIngrList } from './components/RecipeIngrList'
// import { RecipeAddIngredient } from './components/RecipeAddIngredient'

const seasonsChoices = [{ season: "winter" }, { season: "spring" }, { season: "summer" }, { season: "autumn" }]
const mealChoices = [{ meal: "lunch" }, { meal: "dinner" }, { meal: "breakfast" }]

export const RecipeEdit = (props) => {
    return (
    <Edit title={<RecipeTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required}/>
            <SelectArrayInput source="seasons" choices={seasonsChoices} optionText="season" optionValue="season"/>  
            <SelectArrayInput source="meal" choices={mealChoices} optionText="meal" optionValue="meal"/>          
            <RecipeIngrList/>

            <ReferenceInput label="Ingredient" source="ingredient_id" reference="ingredients" allowEmpty>
                <AutocompleteInput optionText="name" optionValue="id" options={{ filter: AutoComplete.caseInsensitiveFilter }}/>
            </ReferenceInput>

        </SimpleForm>
    </Edit>
)}

