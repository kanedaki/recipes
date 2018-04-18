import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientMacroNutrient } from './IngredientMacroNutrient'

class IngredientMacroInfoRaw extends React.Component{    
    render(){
        const { macroInfo, collapsed } = this.props
        const macroNames = Object.keys(macroInfo)
        return (
            <div>
                {!collapsed && macroNames.map(el => <IngredientMacroNutrient key={el} name={el} value={macroInfo[el].value} unit={macroInfo[el].unit}/>)}
            </div>
        )
    }
}

export const IngredientMacroInfo = withCollapse(IngredientMacroInfoRaw)