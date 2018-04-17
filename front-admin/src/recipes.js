import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, AutocompleteInput } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';

export const RecipeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const RecipeTitle = ({ record }) => {
    return <span>Recipe {record ? `"${record.name}"` : ''}</span>;
};

const choices = [
    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
];

export const RecipeEdit = (props) => (
    <Edit title={<RecipeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            
            <TextInput source="name" />

            <ReferenceInput label="Ingredient" source="ingredient_id" reference="ingredients" allowEmpty>
                <AutocompleteInput optionText="name" optionValue="id"  options={{ filter: AutoComplete.caseInsensitiveFilter }}/>
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const RecipeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users" validate={required} allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);