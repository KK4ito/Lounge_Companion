/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export default class Drinks extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
