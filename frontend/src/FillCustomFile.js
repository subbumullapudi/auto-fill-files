import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './App.css';

class FillCustomFile extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    //TODO: Add validation for Uploaded files
    console.log("Change");
  }
  //Form submission and call API to upload PDF
  handleSubmit(event) {
    event.preventDefault();
    // Build form data to send to API
    var formData = new FormData(event.target);
    fetch('http://localhost:5000/api/extractfields',{
     method: 'POST',
     body: formData
    }).then(res => {
        return res.json();
    }).then(data =>{
        if(data["error"]){
          throw new Error(data["error"]);
        }else{
          this.gotoFillfile(data);
        }
    }).catch(err => console.log(err));
  }
  gotoFillfile(newFields){
    console.log(newFields);
    console.log("NAV to home for filling");
    this.props.update(newFields);
    this.props.history.push('/');//TODO:Failing
  }
  render() {
    return (
      <div className="upload-file">
      <form  encType="multipart/form-data" onSubmit={this.handleSubmit} ref="form">
        <input type="file" name="pdfFile" onChange={this.handleChange}/>
        <br />
        <input type="submit" value="Generate fields from File"/>
      </form>
      <br/>
        <div>
          <Link to="/">Go back</Link> to fill Address.
        </div>
      </div>
    );
  }
}

export default withRouter(FillCustomFile);
