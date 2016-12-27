
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button , ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, Grid, Row, Col, Clearfix} from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: 'Gruppe 1 vs Gruppe 2',
            captchaOK: null,
        };

        this.captchaChanged = this.captchaChanged.bind(this);

    }

    captchaChanged(value) {
      console.log('captchaChanged');
      console.log(value);
      if(value){
        this.setState({
          captchaOK: true
        });
      } else {
        this.setState({
          captchaOK: false
        });
      }
    }
/*
      let options = {
        method: 'POST',
        mode: 'cors',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form:   {
          secret: '6LfArg8UAAAAAFOzAkZ0NLfC24HGntCHWJJLczG2',
          response: value
          //response: 'fweiojfweiodrfjeiodfeiodh'
        }
      };
      fetch(options)
      .then(res =>{
        console.log(res.json())
      });

      fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: '6LfArg8UAAAAAFOzAkZ0NLfC24HGntCHWJJLczG2',
          response: value
        }),
      })
      .then(response => response.json())
      .then(json => console.log(json));

*/

    render() {
        return (
            <Jumbotron>
                <h1>Toeggele</h1>
                    <Grid>
                        <Row className="show-grid">
                            <h2>angemeldete Teams</h2>
                            <Col xs={12} md={8}>
                                <ListGroup>
                                    <ListGroupItem>Gruppe 1</ListGroupItem>
                                    <ListGroupItem>Gruppe 2</ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col xs={6} md={4}>
                               <FormGroup>
                                   <ControlLabel>Zurzeit spielt:</ControlLabel>
                                   <FormControl.Static>{this.state.current}</FormControl.Static>
                                   <FormControl.Static>Das Team, welches verloren hat, meldet sich ab</FormControl.Static>
                                   <ReCAPTCHA
                                     ref="recaptcha"
                                     sitekey="6LfArg8UAAAAAERQ_A1e32q4f1Ti-ZbXLwuUOkug"
                                     onChange={this.captchaChanged}
                                     />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormControl
                          type="text"
                          placeholder="Enter text"
                          />
                        <Row className="show-grid">
                            <h2>Abmelden</h2>
                        </Row>
                        <Row className="show-grid">
                            <h2>Anmelden</h2>
                        </Row>
                        <Row classname="show-grid">
                            <h2>Master Code aendern</h2>

                        </Row>
                    </Grid>
            </Jumbotron>
        );
    }
}
