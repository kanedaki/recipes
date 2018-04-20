import React from 'react';
import { Edit, DisabledInput, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';

const RecipeTitle = ({ record }) => {
    return <span>Recipe {record ? `"${record.name}"` : ''}</span>;
};

export const RecipeEdit = (props) => (
    <Edit title={<RecipeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            
            <TextInput source="name" validate={required}/>

            <ReferenceInput label="Ingredient" source="ingredient_id" reference="ingredients" allowEmpty>
                <AutocompleteInput optionText="name" optionValue="id"  options={{ filter: AutoComplete.caseInsensitiveFilter }}/>
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

