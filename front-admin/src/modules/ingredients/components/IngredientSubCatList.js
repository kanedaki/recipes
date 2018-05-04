import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientNutrient } from './IngredientNutrient'

class IngredientSubCatListRaw extends React.Component{    
    render(){
        const { label, list, cat, subCat, subCatName, collapsed } = this.props

        return (
            <div>
                {!collapsed && <label><b>{label}</b></label>}
                {!collapsed && list.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={cat} subCat={subCat} subCatName={`${subCatName}[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}                      
            </div>
        )
    }
}

export const IngredientSubCatList = withCollapse(IngredientSubCatListRaw)