import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export default class WhereAreWe extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
