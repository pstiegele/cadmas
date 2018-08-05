import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (<footer className="footer">
      <Grid>
        <nav className="pull-left">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/assets/bachelorthesis.pdf">My bachelor thesis</a>
            </li>
            <li>
              <a href="mailto:accpaul23@gmail.com">Contact me</a>
            </li>
            <li>
              <a href="http://paul-stiegele.de/index.php?option=com_content&view=category&id=12">Imprint</a>
            </li>
          </ul>
        </nav>
        <p className="copyright pull-right">
          &copy; {(new Date()).getFullYear()}
          <a href="http://www.paul-stiegele.de">
            &nbsp;Paul Stiegele</a>, made with love for a better drone world
        </p>
      </Grid>
    </footer>);
  }
}

export default Footer;
