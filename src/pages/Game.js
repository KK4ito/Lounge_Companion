
import React from 'react';
import { Jumbotron, ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

export default class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current: 'Gruppe 1 vs Gruppe 2',
            captchaOK: null,
            url: 'http://64.137.190.213/LoungeCompanionREST/src/public/index.php/teams',
            Teams: [],
            toDelete: null
        };

        this.captchaChanged = this.captchaChanged.bind(this);

    }



    componentDidMount(){
        fetch(this.state.url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                this.setState({Teams: json})
            });

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
    getOldestTeams(){
        console.log("startet get oldest");
        console.log(this.state.Teams.length);
        console.log(this.state.Teams);
        console.log(this.state.Teams[0].entrytime < this.state.Teams[1].entrytime);
        if (this.state.Teams.length < 2){
            return 'Nicht genug Spieler angemeldet';
        }
        else if (this.state.Teams.length == 2){
            return (this.state.Teams[0].name + ' vs ' + this.state.Teams[1].name);
        }
        else {
            var t1 = this.state.Teams[0];
            var t2 = this.state.Teams[1];
            for (var team in this.state.Teams) {
                if (t2.entrytime < t1.entrytime){
                    if (team.entrytime < t2.entrytime){
                        t2 = team;
                    }
                } else {
                    if (team.entrytime < t1.entrytime){
                        t1 = team;
                    }
                }
            }
            return (t1.name + ' vs ' + t2.name);
        }
    }*/
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
                                    {this.state.Teams.map(function (team, index) {
                                        return <ListGroupItem textAlign="center" key={index} onClick={this.state.toDelete = team.id}>{team.name}</ListGroupItem>
                                    }, this)}
                                </ListGroup>
                            </Col>
                            <Col xs={6} md={4}>
                               <FormGroup>
                                   <ControlLabel>Zurzeit spielt:</ControlLabel>
                                   <FormControl.Static>Platzhalter</FormControl.Static>
                                   <FormControl.Static>Das Team, welches verloren hat, meldet sich ab</FormControl.Static>
                                   <ReCAPTCHA
                                     ref="recaptcha"
                                     sitekey="6LfArg8UAAAAAERQ_A1e32q4f1Ti-ZbXLwuUOkug"
                                     onChange={this.captchaChanged}
                                     />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <h2>Abmelden</h2>
                            <FormGroup controlId="formDelete">
                                <FormControl.Static >Hier sollte das angeklickte Team stehen</FormControl.Static>
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Code ein"
                                />
                                <Button type="submit">
                                    Abmelden
                                </Button>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <h2>Anmelden</h2>
                            <FormGroup controlId="formCreate">
                                <FormControl.Static>Mit dem Code, der hier angegeben wird, kann später das Team sich wieder abmelden</FormControl.Static>
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Teamnamen an"
                                />
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Code ein"
                                />
                                <Button type="submit">
                                    Anmelden
                                </Button>

                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <h2>Master Code aendern</h2>
                            <FormGroup controlId="fromChange">
                                <FormControl
                                    type="text"
                                    placeholder="neuer Master Code"
                                />
                                <Button type="submit">
                                Code anpassen
                                </Button>
                            </FormGroup>

                        </Row>
                    </Grid>
            </Jumbotron>
        );
    }
}
