/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Title: 'Novum Lounge',
            SubtitleOpen: 'Oeffnungszeiten',
            SubtitleEvents: 'Events',
            Description: 'Tabs',
            OpenTime: 0,
        };
    }
    render() {
        return
            <Jumbotron>
                <h1>{this.state.Title}</h1>
                <p>{this.state.Description}</p>
                <h2>{this.state.SubtitleOpen}</h2>
                <p>{this.state.OpenTime}</p>
                <h2>{this.state.SubtitleEvents}</h2>
                <li></li>
            </Jumbotron>;
    }
}
