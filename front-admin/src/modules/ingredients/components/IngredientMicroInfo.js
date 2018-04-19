import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientNutrient } from './IngredientNutrient'

class IngredientMicroInfoRaw extends React.Component{    
    render(){
        const { microInfo, collapsed } = this.props
        const { minerals, vitamins } = microInfo

        return (
            <div>
                {!collapsed && <label><b>Minerals</b></label>}
                {!collapsed && minerals.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'general'} subCat={'micro'} subCatName={`minerals[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}
                
                {!collapsed && <label><b>Vitamins</b></label>}
                {!collapsed && vitamins.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'general'} subCat={'micro'} subCatName={`vitamins[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}                
            </div>
        )
    }
}

export const IngredientMicroInfo = withCollapse(IngredientMicroInfoRaw)