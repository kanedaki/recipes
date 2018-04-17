import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'admin-on-rest';

export const IngredientList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="subcategory" />
            <TextField source="calories.value" />
            <TextField source="calories.unit" />
            <EditButton />
        </Datagrid>
    </List>
);