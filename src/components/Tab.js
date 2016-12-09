import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export class Tab extends React.Component {
  displayName: 'Tab';
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
