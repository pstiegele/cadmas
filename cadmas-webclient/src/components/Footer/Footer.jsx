import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (<footer className="footer">
      <Grid>
        <nav className="pull-left">
          <ul>
            <li>
              <a href="#pablo">
                Home
              </a>
            </li>
            <li>
              <a href="#pablo">
                About CADMAS
              </a>
            </li>
            <li>
              <a href="#pablo">
                Contact us
              </a>
            </li>
            <li>
              <a href="#pablo">
                Imprint
              </a>
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
