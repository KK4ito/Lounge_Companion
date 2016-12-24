/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, ListGroup, ListGroupItem } from 'react-bootstrap';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Title: 'Novum Lounge',
            SubtitleOpen: 'Oeffnungszeiten',
            SubtitleEvents: 'Events',
            Description: 'Wir sind die Studentenbar am Campus Brugg-Windisch der FHNW. Die wahren Studenten unter euch finden sich in der Vorlesungszeit jeden Donnerstag und Freitag ab 16:00 Uhr hinter dem Gebäude 4 wieder.',
            OpenTime: ['Do: 4pm - 2am','Fr: 4pm - 2am'],
            Events: [],
            url: 'http://64.137.190.213/LoungeCompanionREST/src/public/index.php/events'
        };
    }

    componentDidMount(){
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                //this.state.Events=result.blob();
                //console.log(result);
                return result.json();
            })
            .then(console.log('bla'));
    }

    render() {
        return (
            <Jumbotron>
                <h1>{this.state.Title}</h1>
                <p>{this.state.Description}</p>
                <h2>{this.state.SubtitleOpen}</h2>
                <ListGroup>{this.state.OpenTime.map(function(time, index){
                    return <ListGroupItem key={index}>{time}</ListGroupItem>;
                })}</ListGroup>
                <h2>{this.state.SubtitleEvents}</h2>
                <ListGroup>{this.state.Events.map(function(event, index){
                    return <ListGroupItem key={index}>{event}</ListGroupItem>;
                })}</ListGroup>
            </Jumbotron>
        );
    }
}
