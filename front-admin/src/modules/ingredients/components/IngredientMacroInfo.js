import React from 'react'
import { IngredientMacroNutrient } from './IngredientMacroNutrient'

export class IngredientMacroInfo extends React.Component{
    constructor(){
        super()
        this.state = {
            collapsed: true
        }
        this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    
    render(){
        const { macroInfo} = this.props
        const macroNames = Object.keys(macroInfo)
        return (
            <div>
                <h2>Macronutrients</h2>
                <button type='button' onClick={this.toggleCollapse}>{ this.state.collapsed ? 'Expand' : 'Collapse'}</button>
                {!this.state.collapsed && macroNames.map(el => <IngredientMacroNutrient key={el} name={el} value={macroInfo[el].value} unit={macroInfo[el].unit}/>)}
            </div>
        )
    }

    toggleCollapse(e){
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
}