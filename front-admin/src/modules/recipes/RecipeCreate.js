import React from 'react';
import { Create, Datagrid, SimpleForm, TextInput, LongTextInput } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';

export const RecipeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);