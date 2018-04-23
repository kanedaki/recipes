import React from 'react'

export class RecipeAddIngredient extends React.Component{
    constructor(){
        super()
        
        this.addIngredientToList = this.addIngredientToList.bind(this)
    }

    render() {
        return (
            <div>
                <span><b>uuuuuu</b></span>
            </div>
        )
    }

    addIngredientToList(e){
        console.log('AÑADIR')
    }
}