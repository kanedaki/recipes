import React from 'react'
import withCollapse from '../../hocs/withCollapse'
// import { IngredientCarbSimplesInfo } from './IngredientCarbSimplesInfo'
// import { IngredientCarbOrganicsInfo } from './IngredientCarbOrganicsInfo'
// import { IngredientCarbPhytosterolsInfo } from './IngredientCarbPhytosterolsInfo'
// import { IngredientCarbNotAvailableInfo } from './IngredientCarbNotAvailableInfo'
import { IngredientNutrient } from './IngredientNutrient'

class IngredientCarbohydratesInfoRaw extends React.Component{    
    render(){
        const { carbohydratesInfo, collapsed } = this.props
        const { simples, organics, phytosterols, notAvailable } = carbohydratesInfo

        return (
            <div>
                {/* <IngredientCarbSimplesInfo carbSimplesInfo={carbohydratesInfo.simples} label='Simples'/>
                <IngredientCarbOrganicsInfo carbOrganicsInfo={carbohydratesInfo.organics} label='Organics'/>
                <IngredientCarbPhytosterolsInfo carbPhytosterolsInfo={carbohydratesInfo.phytosterols} label='Phytosterols'/>
                <IngredientCarbNotAvailableInfo carbNotAvailableInfo={carbohydratesInfo.notAvailable} label='Not Available'/>                 */}
                {!collapsed && <label><b>Simples</b></label>}
                {!collapsed && simples.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'carbohydrates'} subCatName={`simples[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}
                
                {!collapsed && <label><b>Organics</b></label>}
                {!collapsed && organics.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'carbohydrates'} subCatName={`organics[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}          

                {!collapsed && <label><b>Phytosterols</b></label>}
                {!collapsed && phytosterols.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'carbohydrates'} subCatName={`phytosterols[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}
                
                {!collapsed && <label><b>Not Available</b></label>}
                {!collapsed && notAvailable.map((el, i) => 
                    <IngredientNutrient key={el.name} cat={'detail'} subCat={'carbohydrates'} subCatName={`notAvailable[${i}]`} label={el.name} value={el.value} unit={el.unit}/>)}                      
            </div>
        )
    }
}

export const IngredientCarbohydratesInfo = withCollapse(IngredientCarbohydratesInfoRaw)