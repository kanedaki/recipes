import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton} from 'admin-on-rest';

export const RecipeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);