import React, { Component } from 'react';

/*Component to render form fields from JSON properties
This can be expanded to customize form fields.
*/
class Jsontoinput extends Component{
  render(){
    return (
      <div className="form-field">
        <dt><label>{this.props.label}</label></dt>
        <dd><input type="text" name={this.props.label} /></dd>
      </div>
    );
  }
}

export default Jsontoinput;
