import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

export const RecipeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
        </Datagrid>
    </List>
);