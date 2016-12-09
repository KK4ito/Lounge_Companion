/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button , ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, Grid, Row, Col, Clearfix} from 'react-bootstrap';


export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: 'Gruppe 1 vs Gruppe 2'
        };
    }
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
                                </FormGroup>
                            </Col>
                        </Row>
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
