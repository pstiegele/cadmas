import React, {Component} from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/avatar.jpg";

class UserProfile extends Component {
  render() {
    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col md={8}>
            <Card title="Edit Profile" content={<form > <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
                  {
                    label: "Username",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Username",
                    defaultValue: "pstiegele"
                  }, {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    placeholder: "Email"
                  }
                ]}/>
              <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
                  {
                    label: "First name",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "First name",
                    defaultValue: "Paul"
                  }, {
                    label: "Last name",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Last name",
                    defaultValue: "Stiegele"
                  }
                ]}/>
              <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
                  {
                    label: "Old password",
                    type: "password",
                    bsClass: "form-control",
                    placeholder: "12345",
                    defaultValue: "12345"
                  }, {
                    label: "New password",
                    type: "password",
                    bsClass: "form-control",
                    placeholder: "12345",
                    defaultValue: "12345  "
                  }
                ]}/>

              <Button bsStyle="info" pullRight="pullRight" fill="fill" type="submit">
                Update Profile
              </Button>
              <div className="clearfix"></div>
            </form>}/>
          </Col>
          <Col md={4}>
            <UserCard bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" avatar={avatar} name="Paul Stiegele" userName="pstiegele" description={<span > Skywalker X - 8 < br /> Pathfinder Hexacopter < /span>} socials={<div > <Button simple="simple">
                Delete Profile
              </Button>

            </div>}/>
          </Col>

        </Row>
      </Grid>>
    </div>);
  }
}

export default UserProfile;
