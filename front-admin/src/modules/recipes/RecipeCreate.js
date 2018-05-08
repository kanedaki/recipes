import React from 'react';
import { NumberInput, Create, ReferenceInput, required, SimpleForm, TextInput, AutocompleteInput, SelectArrayInput } from 'admin-on-rest'
import AutoComplete from 'material-ui/AutoComplete'
import RichTextInput from 'aor-rich-text-input';

import { FieldArray, change } from 'redux-form'
import { connect } from 'react-redux'


const seasonsChoices = [{ season: "winter" }, { season: "spring" }, { season: "summer" }, { season: "autumn" }]
const mealChoices = [{ meal: "lunch" }, { meal: "dinner" }, { meal: "breakfast" }]

const renderIngredients = change => (record) => {
    return (
        <div>
            <br/>
            <button ref={node => {this.node = node}} type="button" onClick={ () => { 
                record.fields.push(record.newIngredient)
                change('record-form', 'new_ingredient_qty', '')
                change('record-form', 'ingredient_name', '')
            }
            }>Add Ingredient</button>
            <br/><br/>
            <label><b>Ingredients</b></label>
            <ul>
                { record.fields.getAll() && record.fields.getAll().map((el, i) => {
                    return (
                        <div key={el.ingredient}>
                            <li>{el.qty} {el.unit} de {el.ingredient}
                                <button type="button" onClick={() => record.fields.remove(i)}>Delete Ingredient</button>
                            </li>
                        </div>
                    )
                })}
            </ul> 
        </div>
    )
}

class RecipeCreateRaw extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ingredient: '',
            qty: ''
        }
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

    handleNewRequest = (chosenRequest, index) => {
        this.setState({
            ingredient: chosenRequest.text,
            qty: this.state.qty
        })

        // const { allowEmpty, choices, input, optionValue } = this.props;
        // let choiceIndex = allowEmpty ? index - 1 : index;

        // // The empty item is always at first position
        // if (allowEmpty && index === 0) {
        //     return input.onChange('');
        // }

        // console.log('aaaa', input, choices, choiceIndex, optionValue)
        // // input.onChange(choices[choiceIndex][optionValue]);
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
                    <ReferenceInput label="Ingredient" source="ingredient_name" reference="ingredients" perPage={10000} allowEmpty >
                        <AutocompleteInput
                                defaultValue=''
                                optionText="name" 
                                optionValue="id" 
                                options={{ 
                                    filter: AutoComplete.caseInsensitiveFilter, 
                                    onUpdateInput: this.handleUpdateInputIngr,
                                    onNewRequest: this.handleNewRequest}} />
                    </ReferenceInput>
                    <FieldArray name={'ingredients'} component={renderIngredients(this.props.change)} newIngredient={this.state}/>

                    <RichTextInput source="steps" validate={required} />

                </SimpleForm>
            </Create>
        )
    }
}

export const RecipeCreate = connect(null, {change})(RecipeCreateRaw)
