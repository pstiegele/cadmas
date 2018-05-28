import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import { UserCard } from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { connect } from "react-redux";



const mapStateToProps = (state) => {
  return { user: state.user, drone: state.drone };
};


class UserProfile extends Component {
  getThumbnailPicture(path) {
    try {
      return require(`${path}`);
    } catch (e) {
      return require("assets/img/default_drone.svg");
    }

  }

  getDroneNames() {
    var drones;
    this.props.drone.drones.map((prop, key) => {
      if (drones === undefined) {
        drones = prop.name + ", ";
      } else {
        if (key !== this.props.drone.drones.length - 1) {
          drones = drones + prop.name + ", ";
        } else {
          drones = drones + prop.name;
        }
      }
      return null;
    });
    return drones;
  }

  onChange(){

  }

  render() {
    return (<div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card title="Edit Profile" content={<form > <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
              {
                label: "Username",
                type: "text",
                bsClass: "form-control",
                placeholder: "Username",
                defaultValue: this.props.user.username
              }, {
                label: "Email address",
                type: "email",
                bsClass: "form-control",
                placeholder: "your@email.com",
                defaultValue: this.props.user.email
              }
            ]} />
              <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
                {
                  label: "First name",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "First name",
                  defaultValue: this.props.user.firstname
                }, {
                  label: "Last name",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Last name",
                  defaultValue: this.props.user.lastname
                }
              ]} />
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
              ]} />

              <Button bsStyle="info" pullRight fill type="submit">
                Update Profile
              </Button>
              <div className="clearfix"></div>
            </form>} />
          </Col>
          <Col md={4}>
            <UserCard bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" avatar={"userthumbs/" + this.props.user.thumbnailpath} name={this.props.user.firstname + " " + this.props.user.lastname} userName={this.props.user.username} description={<span > {this.getDroneNames()} </span>} socials={<div > <Button simple>
              Delete Profile
              </Button>

            </div>} />
          </Col>

        </Row>
      </Grid>>
    </div>);
  }
}
export default connect(mapStateToProps)(UserProfile);
