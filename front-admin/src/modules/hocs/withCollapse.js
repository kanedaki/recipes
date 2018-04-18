import React from 'react'
import './hocs.css'

export default function withCollapse (component) {
    class WithCollapse extends React.Component{
        constructor(){
            super()
            this.state = {
                collapsed: true
            }
            this.toggleCollapse = this.toggleCollapse.bind(this)
        }
    
        render() {
            const { component: Component, label, ...rest } = this.props
            return (
                <div>
                    <h2 className='collapse-title'>{label}</h2>
                    <button className='collapse-button' type='button' onClick={this.toggleCollapse}>{ this.state.collapsed ? 'Expand' : 'Collapse'}</button>
                    <Component collapsed={this.state.collapsed} {...rest}/>
                </div>
            )
        }
    
        toggleCollapse(e){
            this.setState({
                collapsed: !this.state.collapsed
            })
        }
    }

    return (props) => <WithCollapse {...props} component={component}/>
}