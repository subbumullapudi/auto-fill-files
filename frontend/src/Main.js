import React, {Component} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Fillfile from './Fillfile'
import FillCustomFile from './FillCustomFile'

// The Main component that renders the routes

class Main extends Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path='/' render={() => <Fillfile setDefaultFields={this.props.setDefaultFields}/> } />
          <Route path='/fillcustomfile' render={() => <FillCustomFile update={this.props.update}/>} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(Main)
