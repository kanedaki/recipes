import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientNutrient } from './IngredientNutrient'

class IngredientFatAcidsInfoRaw extends React.Component{    
    render(){
        const { fatAcidsInfo, collapsed } = this.props

        return (
            <div>
                {!collapsed && fatAcidsInfo.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'fatAcids'} subCatName={`[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}
            </div>
        )
    }
}

export const IngredientFatAcidsInfo = withCollapse(IngredientFatAcidsInfoRaw)