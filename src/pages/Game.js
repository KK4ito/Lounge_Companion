/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button , ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';


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

                    <ListGroup>
                        <ListGroupItem>Gruppe 1</ListGroupItem>
                        <ListGroupItem>Gruppe 2</ListGroupItem>
                    </ListGroup>
                    <FormGroup>
                        <ControlLabel>Zurzeit spielt:</ControlLabel>
                        <FormControl.Static>{this.state.current}</FormControl.Static>
                        <FormControl.Static>Das Team, welches verloren hat, meldet sich ab</FormControl.Static>
                    </FormGroup>

            </Jumbotron>
        );
    }
}
