import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Main from './Main';

//Starter Component
class App extends Component {
  constructor(props) {
    super(props);
    //Default state which will be passed to Fillfile
    this.state = {
      data:{address:"",fileNumber:1}
    };
    this.updateDynamicFields = this.updateDynamicFields.bind(this);
    this.setDefaultFields = this.setDefaultFields.bind(this);
  }
  updateDynamicFields(updateFields){
    this.setState({data:updateFields});
    console.log("Parent:", this.state.data);
  }
  setDefaultFields(){
    return this.state.data;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auto fill PDF documents</h1>
        </header>
        <Main update={this.updateDynamicFields} setDefaultFields={this.setDefaultFields}/>
      </div>
    );
  }
}

export default withRouter(App);
