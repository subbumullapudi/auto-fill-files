import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Jsontoinput from './Jsontoinput';
import './App.css';

/*Component to:
1. Fill default forms with address.
2. Fill custom forms generated by custom FDFs.
*/
class Fillfile extends Component {
  constructor(props) {
  super(props);
  this.state = {
  };
  this.state.data = this.props.setDefaultFields();
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  //Function to make async API call
  callApi = async () => {
    const response = await fetch(`http://localhost:5000/api/fillfields`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.data)
    });
    const body = await response;
    const blob = response.blob();
    if (response.status !== 200) throw Error(body.message);
    return blob;
  };

  //Update state valriables post form submission and on change of input
  handleChange(event) {
    if(event.target.value.indexOf("smart_form_1") >= 0) this.state.data["fileNumber"]  = 1;
    else if(event.target.value.indexOf("smart_form_2") >= 0) this.state.data["fileNumber"] = 2 ;
  }
  //Form submission and call API to fill and download PDF
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [key, value]  of formData.entries()) {
        this.state.data[key] = value;
    }
    this.callApi()
      .then(res =>{
        if(res["error"])
          console.log(res);
        else{
          var docName = '';
          if(this.state.data["fileNumber"]){
            docName = `smart_form_${this.state.data["fileNumber"]}_Completed.pdf`;
          }else if(this.state.data["fillableFile"]){
            docName = `smarter_form_Completed.pdf`;
          }
          require("downloadjs")(res, docName, "application/pdf");
        }
      })
      .catch(err => console.log(err));
  }
  //Convert JSON to Form
  JSONtoForm(){
    var dynamicForm = [];
     for(var item in this.state.data){
       if(item !== "fillableFile" && item !== "fileNumber"){
        var fieldTag = <Jsontoinput label={item} key={item} />
        dynamicForm.push(fieldTag);
      }
    }
    return dynamicForm;
  }
  //Function to decide the buttons for file generation
  GenerateBtns(){
    if(this.state.data["fileNumber"]){
      return(
        <div>
          <input type="hidden" value={this.state.data.fileNumber} />
          <input type="submit" value="Generate smart_form_1.pdf" onClick={this.handleChange}/>
          <input type="submit" value="Generate smart_form_2.pdf" onClick={this.handleChange}/>
        </div>
      );
    }else if(this.state.data["fillableFile"]){
      return(
        <div>
          <input type="hidden" value={this.state.data.fillableFile} />
         <input type="submit" value="Generate smarter_form.pdf" onClick={this.handleChange}/>
       </div>
     );
    }
  }
  render() {
    return (
      <div>
        <form className="App-form" onSubmit={this.handleSubmit}>
            {this.JSONtoForm()}
          <br/>
          {this.GenerateBtns()}
        </form>
        <div>
          Or you can fill your own file <Link to='/fillcustomfile'>here</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Fillfile);
