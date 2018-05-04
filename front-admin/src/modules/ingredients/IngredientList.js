import React from 'react'
import { List, Datagrid, TextField, EditButton, FunctionField } from 'admin-on-rest'

export const IngredientList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="subcategory" />
            <FunctionField label="calories" render={record => record.calories && `${record.calories.value} ${record.calories.unit}`} />    
            <EditButton />
        </Datagrid>
    </List>
)