import React from 'react'
import withCollapse from '../../hocs/withCollapse'
import { IngredientSubCatList } from './IngredientSubCatList'

class IngredientMicroInfoRaw extends React.Component{    
    render(){
        const { microInfo, collapsed } = this.props
        const { minerals, vitamins } = microInfo

        return (
            <div>
                {!collapsed && <IngredientSubCatList label={'Minerals'} list={minerals}  cat={'general'} subCat={'micro'} subCatName={`minerals`}/>}                      
                {!collapsed && <IngredientSubCatList label={'Vitamins'} list={vitamins}  cat={'general'} subCat={'micro'} subCatName={`vitamins`}/>}                      
            </div>
        )
    }
}

export const IngredientMicroInfo = withCollapse(IngredientMicroInfoRaw)

IngredientMicroInfo.displayName = 'IngredientMicroInfo'