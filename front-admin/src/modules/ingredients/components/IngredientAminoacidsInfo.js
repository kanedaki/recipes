import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientNutrient } from './IngredientNutrient'

class IngredientAminoacidsInfoRaw extends React.Component{    
    render(){
        const { aminoacidsInfo, collapsed } = this.props

        return (
            <div>
                {!collapsed && aminoacidsInfo.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'aminoacids'} subCatName={`[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}
            </div>
        )
    }
}

export const IngredientAminoacidsInfo = withCollapse(IngredientAminoacidsInfoRaw)