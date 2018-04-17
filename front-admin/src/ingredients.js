import React from 'react';
import { List, Datagrid, TextField, EditButton, FunctionField, Edit, SimpleForm, TextInput } from 'admin-on-rest';

export const IngredientList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="subcategory" />
            <FunctionField label="calories" render={record => `${record.calories.value} ${record.calories.unit}`} />
            
            <EditButton />
        </Datagrid>
    </List>
);

const IngredientTitle = ({ record }) => {
    return <span>Ingredient {record ? `"${record.name}"` : ''}</span>;
};

const IngredientGeneralInfo = ({ record }) => {
    return (
        <div>
            <IngredientCaloriesInfo />
            <IngredientMacroInfo />
        </div>
    )
};

const IngredientCaloriesInfo = ({ record }) => {
    return (
        <div>
            Calories
        </div>
    )
};

const IngredientMacroInfo = ({ record }) => {
    return (
        <div>
            Macro
        </div>
    )
};

export const IngredientEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="category" />
            <TextInput source="subcategory" />
            <IngredientGeneralInfo />
        </SimpleForm>
    </Edit>
);