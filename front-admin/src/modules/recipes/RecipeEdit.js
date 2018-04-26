import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import { NumberInput, Edit, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput, SelectArrayInput } from 'admin-on-rest'
import RichTextInput from 'aor-rich-text-input';

import { RecipeTitle } from './components/RecipeTitle'
import { FieldArray } from 'redux-form'

const seasonsChoices = [{ season: "winter" }, { season: "spring" }, { season: "summer" }, { season: "autumn" }]
const mealChoices = [{ meal: "lunch" }, { meal: "dinner" }, { meal: "breakfast" }]


const renderIngredients = (record) => {
    return (
        <div>
            <label><b>Ingredients</b></label>
            <ul>
                { record.fields.getAll() && record.fields.getAll().map((el, i) => {
                    return <li key={el.ingredient}>{el.qty} {el.unit} de {el.ingredient}</li> 
                })}
            </ul> 
            <button type="button" onClick={() => record.fields.push(record.newIngredient)}>Add Ingredient</button>
        </div>
    )
}

export class RecipeEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            ingredient: '',
            qty: ''
        }
        this.handleUpdateInputIngrQty = this.handleUpdateInputIngrQty.bind(this)
    }

    handleUpdateInputIngr = (ingredient) => {
        this.setState({
            ingredient: ingredient,
        })
    }

    handleUpdateInputIngrQty = (e, qty) => {
        const value = isNaN(parseFloat(qty)) ? null : parseFloat(qty);
        this.setState({
            qty: value,
        })
    }

    render(){
        return (
            <Edit title={<RecipeTitle />} {...this.props}>
                <SimpleForm submitOnEnter={false}>
                    <TextInput source="name" validate={required}/>
                    <SelectArrayInput source="seasons" choices={seasonsChoices} optionText="season" optionValue="season"/>  
                    <SelectArrayInput source="meal" choices={mealChoices} optionText="meal" optionValue="meal"/>          
                
                    <FieldArray name={'ingredients'} component={renderIngredients} newIngredient={this.state}/>
                    <NumberInput source="new_ingredient_qty" label="Quantity" onChange={this.handleUpdateInputIngrQty} qty={this.state.qty}/>
                    <ReferenceInput label="Ingredient" source="ingredient_name" reference="ingredients" allowEmpty>
                        <AutocompleteInput 
                            optionText="name" 
                            optionValue="id" 
                            options={{ filter: AutoComplete.caseInsensitiveFilter, onUpdateInput: this.handleUpdateInputIngr }} />
                    </ReferenceInput>

                    <RichTextInput source="steps" validate={required} />

                </SimpleForm>
            </Edit>
        )
    }

}

