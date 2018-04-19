import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientSubCatList } from './IngredientSubCatList'

class IngredientCarbohydratesInfoRaw extends React.Component{    
    render(){
        const { carbohydratesInfo, collapsed } = this.props
        const { simples, organics, phytosterols, notAvailable } = carbohydratesInfo

        return (
            <div>
                {!collapsed && <IngredientSubCatList label={'Simples'} list={simples}  cat={'detail'} subCat={'carbohydrates'} subCatName={`simples`}/>}                      
                {!collapsed && <IngredientSubCatList label={'Organics'} list={organics}  cat={'detail'} subCat={'carbohydrates'} subCatName={`organics`}/>}                      
                {!collapsed && <IngredientSubCatList label={'Phytosterols'} list={phytosterols}  cat={'detail'} subCat={'carbohydrates'} subCatName={`phytosterols`}/>}                      
                {!collapsed && <IngredientSubCatList label={'Not Available'} list={notAvailable}  cat={'detail'} subCat={'carbohydrates'} subCatName={`notAvailable`}/>}                      
            </div>
        )
    }
}

export const IngredientCarbohydratesInfo = withCollapse(IngredientCarbohydratesInfoRaw)