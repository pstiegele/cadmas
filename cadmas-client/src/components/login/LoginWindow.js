import React, {Component} from 'react';

export default class LoginWindow extends Component {
  render() {
    return (
  <div className="LoginWindow">
    <section class="start">
      <h3 style={{ textAlign: 'center' }}>Just one more step to the dashboard</h3>
      <form action="login" method="post" name="login" class="form-signin">
        <div class="form-group">
          <input id="usr" type="text" placeholder="Username" name="user" required="required" class="form-control"/>
        </div>
        <div class="form-group">
          <input id="pwd" type="password" placeholder="Password" name="password" required="required" class="form-control"/>
        </div>
        <div class="form-group">
          <button name="Submit" value="Login" type="Submit" class="btn btn-lg btn-success btn-block">Login</button>
        </div>
      </form>
    </section>
  </div>
    );
  }
}
