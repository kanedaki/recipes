import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'admin-on-rest';

export const IngredientList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);