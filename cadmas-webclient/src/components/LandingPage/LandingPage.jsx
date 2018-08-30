import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Grid, Alert, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';

import imagine from 'assets/img/background.jpg';
import logo from 'assets/img/logo.png';
import dashboard from 'assets/img/landingPage/dashboard.svg';
import flight from 'assets/img/landingPage/flight.svg';
import drones from 'assets/img/landingPage/drones.svg';
import CadmasWS from '../../websocket/CadmasWS';
import { Redirect } from 'react-router';
//import util from 'util';

class LandingPage extends Component {

    constructor() {
        super();
        this.state = {
            displayLogin: true,
            username: "",
            password: "",
            isLoading: false
        };
    }
    openLoginView() {
        this.setState({
            displayLogin: !this.state.displayLogin
        });
    }
    setUsername(event) {
        this.setState({
            username: event.target.value,
            wrongCredentials: false
        });
    }
    setPassword(event) {
        this.setState({
            password: event.target.value,
            wrongCredentials: false
        });
    }

    handleLogin(target) {
        if (target.charCode === undefined || target.charCode === 13) {
            this.setState({ isLoading: true });
            var that = this;
            //wait 100ms to login to prevent brute force attacks
            setTimeout(() => {

                CadmasWS.initAuthAPI(this.state.username, this.state.password, function (result) {
                    that.setState({
                        isLoading: false
                    });
                    if (result) {
                        that.setState({
                            redirect: true
                        });
                    } else {
                        that.setState({
                            wrongCredentials: true
                        });
                    }

                });
            }, 100);
        }
    }
    getLogin() {
        if (this.state.displayLogin === true) {
            return <Button bsStyle="success" bsSize="large" onClick={this.openLoginView.bind(this)} >LOG IN</Button>
        } else {
            return <Row>
                <Col lg={4}>&nbsp;</Col>
                <Col lg={4} >
                    {this.state.wrongCredentials ? <Alert bsStyle="danger"><strong>Holy shit!</strong><br /> Your login credentials were unfortunately not correct.</Alert> : ""}
                    <FormGroup controlId="login" onKeyPress={this.handleLogin.bind(this)} >
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="username"
                            onChange={this.setUsername.bind(this)}
                        /> <br /><br />
                        <FormControl
                            type="password"
                            placeholder="password"
                            onChange={this.setPassword.bind(this)}
                        /><br /><br /><br /><br />
                        <Button type="submit" bsStyle="success" disabled={this.state.isLoading ? true : false} onClick={this.handleLogin.bind(this)}>{this.state.isLoading ? "Loading..." : "LOG IN"}</Button>
                    </FormGroup>
                </Col>
                <Col lg={4}>&nbsp;</Col>
            </Row>
        }
    }
    render() {
        const background = {
            backgroundImage: 'url(' + imagine + ')',
            opacity: "0.7",
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            zIndex: "1",
            filter: "blur(5px)"
        };
        const black = {
            backgroundColor: 'grey',
            opacity: "1",
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            zIndex: "0"
        };
        const general = {
            zIndex: "100!important",
            paddingTop: "30px",
            position: "relative",
            color: "black",
            opacity: "1",
            maxHeight: '100%',
            overflowY: 'auto'
        };
        if (this.state.redirect) {
            return <Redirect push to="#" />
        }
        return (
            <div>
                <Modal backdrop={false} bsSize="lg" show={true} style={general} className="text-center">
                    <h1>Welcome to</h1>
                    <div className="logo">
                        <NavLink to="/" className="nav-link simple-text logo-mini">
                            <div className="logo-img">
                                <img src={logo} alt="Cadmas" />
                            </div>
                        </NavLink>
                    </div>
                    <h3 style={{ marginTop: "30px", marginBottom: "70px" }}>Your cloudbased drone management suite.</h3>
                    {this.getLogin()}
                    <Grid fluid={true} style={{ marginTop: "70px" }}>
                        <Row>
                            <Col lg={4} >
                                <img src={dashboard} style={{ width: "150px" }} alt="Cadmas Dashboard" /><br />
                            </Col>
                            <Col lg={4}>
                                <img src={flight} style={{ width: "150px" }} alt="Cadmas Flight" /><br />
                            </Col>
                            <Col lg={4}>
                                <img src={drones} style={{ width: "150px" }} alt="Cadmas Drones" /><br />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Col lg={4}  >
                                <p>With CADMAS, you can keep track of everything related to your drone. Our dashboard will show you all the important information.</p>
                            </Col>
                            <Col lg={4}>
                                <p>You can plan, conduct and then analyze your flights. Create missions and let them fly automatically over and over again to observe for example the progress of a construction project.</p>
                            </Col>
                            <Col lg={4}>
                                <p>Your company owns countless drones? Keep track of them with CADMAS. Which drone flew last? What software version is running on which drone? How much activities has which drone already done?</p>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <footer className="footer" style={{ paddingLeft: "15px" }}>
                                <nav className="pull-left">
                                    <ul>
                                        <li>
                                            <a href="/">Home</a>
                                        </li>
                                        <li>
                                            <a href="http://paul-stiegele.de/download/Entwicklung_einer_webbasierten_Drohnen_Management_Suite_zur_autonomen_Steuerung_und_Verwaltung_von_UAVs.pdf">My bachelor thesis</a>
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
                            </footer>
                        </Row>

                    </Grid>
                </Modal>
                <div style={background}></div>
                <div style={black}></div>
            </div >
        );
    }
}

export default LandingPage;
