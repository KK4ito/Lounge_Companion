
import React from 'react';
import { Jumbotron, ListGroup, ListGroupItem, PanelGroup, Panel } from 'react-bootstrap';


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
      url: 'https://64.137.190.213/LoungeCompanionREST/src/public/index.php/events',
    };
  }

  componentDidMount(){
    fetch(this.state.url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.setState({Events: json})
    });
  }

  render() {
    return (
      <Jumbotron>
        <h1>{this.state.Title}</h1>
        <p>{this.state.Description}</p>
        <h2>{this.state.SubtitleOpen}</h2>
        <ListGroup>
          {this.state.OpenTime.map(function(time, index){
            return <ListGroupItem key={index}>{time}</ListGroupItem>;
            })
          }
          </ListGroup>
          <h2>{this.state.SubtitleEvents}</h2>
          <PanelGroup accordion>
            {this.state.Events.map(event => {
              return <Panel
                eventKey={event.id}
                header={event.name}>
                <ListGroup >
                  <ListGroupItem header="Startet">{event.start}</ListGroupItem>
                  <ListGroupItem header="Ended">{event.end}</ListGroupItem>
                  <ListGroupItem header="Beschreibung">{event.description}</ListGroupItem>
                </ListGroup>
              </Panel>;
            })}
          </PanelGroup>
        </Jumbotron>
      );
    }
  }
