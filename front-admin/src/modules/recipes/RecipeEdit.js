import React from 'react'
import { TextField, List, Datagrid, EditButton, Edit, DisabledInput, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput } from 'admin-on-rest'
import { RecipeTitle } from './components/RecipeTitle'
import { RecipeIngrList } from './components/RecipeIngrList'

import AutoComplete from 'material-ui/AutoComplete'

export const RecipeEdit = (props) => {
    return (
    <Edit title={<RecipeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required}/>
            <RecipeIngrList/>

            <ReferenceInput label="Ingredient" source="ingredient_id" reference="ingredients" allowEmpty>
                <AutocompleteInput optionText="name" optionValue="id" options={{ filter: AutoComplete.caseInsensitiveFilter }}/>
            </ReferenceInput>

        </SimpleForm>
    </Edit>
)}

