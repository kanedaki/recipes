import React from 'react'
import './hocs.css'

export default function withCollapse(component) {
  class WithCollapse extends React.Component {
    constructor() {
      super()
      this.state = {
        collapsed: true
      }
      this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    render() {
      const { component: Component, label, ...rest } = this.props
      const { collapsed } = this.state
      return (
        <div className={'collapse-block'}>
          <button
            className={`collapse-button${collapsed ? '' : ' open'}`}
            type="button"
            onClick={this.toggleCollapse}
          >
            <i class="fas fa-chevron-up" />
            <span>{label}</span>
          </button>
          <div className={`collapse-content${collapsed ? '' : ' open'}`}>
            <Component {...rest} />
          </div>
        </div>
      )
    }

    toggleCollapse(e) {
      this.setState({
        collapsed: !this.state.collapsed
      })
    }
  }

  WithCollapse.displayName = 'WithCollapse'

  return props => <WithCollapse {...props} component={component} />
}
