import React from 'react'
import { Edit, SimpleForm, TextInput } from 'admin-on-rest'
import { IngredientGeneralInfo } from './components/IngredientGeneralInfo'
import { IngredientTitle } from './components/IngredientTitle' 

export const IngredientEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="category" />
            <TextInput source="subcategory" />
            <IngredientGeneralInfo />
        </SimpleForm>
    </Edit>
)