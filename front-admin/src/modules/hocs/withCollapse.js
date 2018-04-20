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
                  <div className="collapse-block">
                      <span className='collapse-title'>{label}</span>
                      <button className='collapse-button' type='button' onClick={this.toggleCollapse}>{ this.state.collapsed ? 'Expand' : 'Collapse'}</button>
                  </div>
                  { !this.state.collapsed && <Component {...rest}/> }
                </div>
            )
        }
    
        toggleCollapse(e){
            this.setState({
                collapsed: !this.state.collapsed
            })
        }
    }

    WithCollapse.displayName = 'WithCollapse'

    return (props) => <WithCollapse {...props} component={component}/>
}