import React, {Component} from 'react';

export default class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (<div className="LoginWindow">
      <section class="start">
        <h3 style={{
            textAlign: 'center',
            color: "white"
          }}>Just one more step to the dashboard</h3>
        <form name="login" class="form-signin">
        <input
           hintText="Enter your Username"
           floatingLabelText="Username"
           onChange = {(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <input
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <button label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
        </form>
      </section>
    </div>);
  }

  handleClick() {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);
  }
}
