import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import Card from 'components/Card/Card.jsx';
import {thArray, tdArray} from 'variables/Variables.jsx';

class Activities extends Component {

  render() {
    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col md={12}>
            <Card title="Activities" category="That are your latest flight activities" ctTableFullWidth="ctTableFullWidth" ctTableResponsive="ctTableResponsive" content={<Table striped hover > <thead>
                <tr>
                  {
                    thArray.map((prop, key) => {
                      return (<th key={key}>{prop}</th>);
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  tdArray.map((prop, key) => {
                    return (<tr key={key}>

                      <td key="icon">
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                          <i className="fa fa-fighter-jet"></i>
                        </NavLink>
                      </td>{
                        prop.map((prop, key) => {
                          return (<td key={key}>{prop}</td>);
                        })
                      }<td key="download">
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                          <i className="fa fa-cloud-download"></i>
                        </NavLink>
                      </td>

                    </tr>)
                  })
                }
              </tbody>
            </Table>}/>
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}

export default Activities;
