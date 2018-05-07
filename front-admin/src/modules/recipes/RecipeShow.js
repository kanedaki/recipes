import React from 'react'
import { Show, SimpleShowLayout, TextField, ChipField, RichTextField } from 'admin-on-rest'

import { RecipeTitle } from './components/RecipeTitle'

import { RecipeIngredients } from './components/RecipeIngredients'


export const RecipeShow = (props) => (
    <Show title={<RecipeTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <ChipField source="seasons"/>  
            <ChipField source="meal"/>          

            <label><b>Ingredients</b></label>
            <RecipeIngredients />

            <RichTextField source="steps" />

        </SimpleShowLayout>
    </Show>
)

