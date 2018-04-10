import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import {thArray, tdArray} from 'variables/Variables.jsx';

class TableList extends Component {

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
                        <i className="fa fa-fighter-jet"></i>
                      </td>{
                        prop.map((prop, key) => {
                          return (<td key={key}>{prop}</td>);
                        })
                      }<td key="download">
                        <i className="fa fa-cloud-download"></i>
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

export default TableList;
