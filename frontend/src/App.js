import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    address: '',
    fileNumber: ''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  //Function to make async API call
  callApi = async () => {

    const response = await fetch(`http://localhost:5000/api/filladdress?address=${this.state.address}&filenumber=${this.state.fileNumber}`);
    const body = await response;
    const blob = response.blob();

    if (response.status !== 200) throw Error(body.message);
    return blob;
  };

  //Update state valriables post form submission and on change of input
  handleChange(event) {
    if(event.target.value.indexOf("smart_form_1") >= 0) this.setState({fileNumber: 1});
    else if(event.target.value.indexOf("smart_form_2") >= 0) this.setState({fileNumber: 2});
    else {this.setState({address: event.target.value});}
  }
  //Form submission and call API to fill and download PDF
  handleSubmit(event) {
    event.preventDefault();

    this.callApi()
      .then(res => require("downloadjs")(res, `Smart_form_${this.state.fileNumber}_Completed.pdf`, "application/pdf"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auto Fill PDF documents</h1>
        </header>
        <form className="App-form"  onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" value={this.state.address} onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Generate smart_form_1.pdf" disabled={!this.state.address} onClick={this.handleChange}/>
          <input type="submit" value="Generate smart_form_2.pdf" disabled={!this.state.address} onClick={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default App;
