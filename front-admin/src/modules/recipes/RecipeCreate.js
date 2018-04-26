import React from 'react';
import { NumberInput, Create, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput, SelectArrayInput } from 'admin-on-rest'
import AutoComplete from 'material-ui/AutoComplete'
import RichTextInput from 'aor-rich-text-input';

import { FieldArray } from 'redux-form'


const seasonsChoices = [{ season: "winter" }, { season: "spring" }, { season: "summer" }, { season: "autumn" }]
const mealChoices = [{ meal: "lunch" }, { meal: "dinner" }, { meal: "breakfast" }]

const renderIngredients = (record) => {
    return (
        <div>
            <br/>
            <button type="button" onClick={() => record.fields.push(record.newIngredient)}>Add Ingredient</button>
            <br/><br/>
            <label><b>Ingredients</b></label>
            <ul>
                { record.fields.getAll() && record.fields.getAll().map((el, i) => {
                    return <li key={el.ingredient}>{el.qty} {el.unit} de {el.ingredient}</li> 
                })}
            </ul> 
        </div>
    )
}

export class RecipeCreate extends React.Component {
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
            <Create {...this.props}>
                <SimpleForm submitOnEnter={false} redirect="list">
                    <TextInput source="name" validate={required}/>
                    <SelectArrayInput source="seasons" choices={seasonsChoices} optionText="season" optionValue="season"/>  
                    <SelectArrayInput source="meal" choices={mealChoices} optionText="meal" optionValue="meal"/>          
                
                    <label><b>Add Ingredient</b></label>
                    <NumberInput source="new_ingredient_qty" label="Quantity" onChange={this.handleUpdateInputIngrQty} qty={this.state.qty}/>
                    <ReferenceInput label="Ingredient" source="ingredient_name" reference="ingredients" allowEmpty>
                        <AutocompleteInput 
                            optionText="name" 
                            optionValue="id" 
                            options={{ filter: AutoComplete.caseInsensitiveFilter, onUpdateInput: this.handleUpdateInputIngr }} />
                    </ReferenceInput>
                    <FieldArray name={'ingredients'} component={renderIngredients} newIngredient={this.state}/>

                    <RichTextInput source="steps" validate={required} />

                </SimpleForm>
            </Create>
        )
    }
}

