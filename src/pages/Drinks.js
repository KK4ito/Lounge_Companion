/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export default class Drinks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Title: 'Drinks',
            Drinks: []
        };
    }
    render() {
        return (
            <Jumbotron>
                <h1>{this.state.Drinks}</h1>
                <li></li>
            </Jumbotron>
        );
    }
}
