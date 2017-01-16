
import React from 'react';
import { Jumbotron, ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import Notifications, {notify} from 'react-notify-toast';
import ReCAPTCHA from 'react-google-recaptcha';

// Variable for captcha instance, needed for resetting
let recaptchaInstance;

export default class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current: 'Gruppe 1 vs Gruppe 2',
            captchaOK: null,
            url: 'https://64.137.190.213/LoungeCompanionREST/src/public/index.php/teams',
            Teams: [],
            toDelete: null,
            NewCode: null,
            OldCode: null,
            formDeleteValue: '',
            formCreateName: '',
            formCreateCode: '',
            alert: null,
        };
        this.captchaChanged = this.captchaChanged.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.createTeam = this.createTeam.bind(this);
        this.changeMaster = this.changeMaster.bind(this);
        this.onChangeDelete = this.onChangeDelete.bind(this);
        this.onChangeCreateCode = this.onChangeCreateCode.bind(this);
        this.onChangeCreateName = this.onChangeCreateName.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeOldCode = this.onChangeOldCode.bind(this);
    }

    // fetch teams from API
    componentDidMount(){
        fetch(this.state.url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                this.setState({Teams: json})
            });
    }

    // check and verify captcha
    captchaChanged(value) {
      console.log('captchaChanged');
      console.log(value);
      if(value){
        // verify Recaptcha without google api
        this.setState({
          captchaOK: true
        });
      } else {
        this.setState({
          captchaOK: false
        });
      }
    }

    //check code of team to delete and delete if it matches
    deleteTeam(value) {
      if(this.state.toDelete && (value === this.state.toDelete.code)) {
        fetch(this.state.url + '/' + this.state.toDelete.id, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(output => {
          if(output) {
            notify.show('Team gelöscht', 'success');
            recaptchaInstance.reset();
            this.setState({formDeleteValue: ''});
            fetch(this.state.url, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => this.setState({Teams: json}))
          }
        }
      )} else {
        notify.show('Error Code', 'error');
      }
    }

    //create a new Team and push it to the API via POST request
    createTeam(name, code) {
      if(name && code) {
        let request = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            code: code,
          }),
        };
        fetch(this.state.url, request)
        .then(res => res.json())
        .then(output => this.setState({Teams: this.state.Teams.concat([output])}))
        .then( () => this.setState(
          {
            formCreateCode: '',
            formCreateName: '',
          }
        ))
        .then( () => notify.show('Team erstellt', 'success'));
      }
    }

    changeMaster(oldCode, newCode) {
      if (oldCode && newCode) {
        fetch(this.state.url)
        .then(response => response.json())
        .then(json => {
            let storedCode = oldCode && json[0].code;
        });

      } else {
        notify.show('Missing input', 'warning');
      }
    }

    onChangeDelete(e) {
      this.setState({ formDeleteValue: e.target.value });
    }

    onChangeCreateCode(e) {
      this.setState({ formCreateCode: e.target.value });
    }

    onChangeCreateName(e) {
      this.setState({ formCreateName: e.target.value });
    }

    onChangeCode(e) {
      this.setState({ NewCode: e.target.value });
    }

    onChangeOldCode(e){
        this.setState({ OldCode: e.target.value });
    }

    render() {
      let clickedTeam = null;
      if (this.state.toDelete) {
          clickedTeam = <FormControl.Static >{this.state.toDelete.name}</FormControl.Static>;
      } else {
          clickedTeam = <FormControl.Static >Hier sollte das angeklickte Team stehen</FormControl.Static>;
      }
      let playingTeam = null;
      if (this.state.Teams[0] && this.state.Teams[1]) {
          playingTeam = <FormControl.Static>{this.state.Teams[0].name} vs {this.state.Teams[1].name}</FormControl.Static>;
      } else {
        playingTeam = <FormControl.Static>Platzhalter</FormControl.Static>;
      }
        return (
            <Jumbotron>
              <Notifications />
                <h1>Toeggele</h1>
                    <Grid>
                      //shows current teams and current match
                        <Row className="show-grid">
                            <h2>angemeldete Teams</h2>
                            <Col xs={12} md={8}>
                                <ListGroup>
                                    {this.state.Teams.map(function (team, index) {
                                        if (index != 0)
                                        return <ListGroupItem key={index} onClick={() => this.setState({toDelete: team})}>{team.name}</ListGroupItem>
                                    }, this)}
                                </ListGroup>
                            </Col>
                            <Col xs={6} md={4}>
                               <FormGroup>
                                   <ControlLabel>Zurzeit spielt:</ControlLabel>
                                  {playingTeam}
                                   <FormControl.Static>Das Team, welches verloren hat, meldet sich ab</FormControl.Static>
                                </FormGroup>
                            </Col>
                        </Row>
                        // form to delete team with code
                        <Row className="show-grid">
                            <h2>Abmelden</h2>
                            <FormGroup controlId="formDelete">
                                {clickedTeam}
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Code ein"
                                    value={this.state.formDeleteValue}
                                    onChange={this.onChangeDelete}
                                />
                              <br />
                                <ReCAPTCHA
                                  ref={ e => recaptchaInstance = e}
                                  sitekey="6LfArg8UAAAAAERQ_A1e32q4f1Ti-ZbXLwuUOkug"
                                  onChange={this.captchaChanged}
                                  />
                                <br />
                                <Button disabled={!this.state.captchaOK} onClick={() => this.deleteTeam(this.state.formDeleteValue)}>
                                    Abmelden
                                </Button>
                            </FormGroup>
                        </Row>
                        //form to create team
                        <Row className="show-grid">
                            <h2>Anmelden</h2>
                            <FormGroup controlId="formCreate">
                                <FormControl.Static>Mit dem Code, der hier angegeben wird, kann später das Team sich wieder abmelden</FormControl.Static>
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Teamnamen an"
                                    value={this.state.formCreateName}
                                    onChange={this.onChangeCreateName}
                                />
                              <br />
                                <FormControl
                                    type="text"
                                    placeholder="Gib deinen Code ein"
                                    value={this.state.formCreateCode}
                                    onChange={this.onChangeCreateCode}
                                />
                                <br />
                              <Button onClick={() => this.createTeam(this.state.formCreateName, this.state.formCreateCode)}>
                                    Anmelden
                                </Button>
                            </FormGroup>
                        </Row>
                        //form to change master code
                        <Row className="show-grid">
                            <h2>Master Code aendern</h2>
                            <FormGroup controlId="fromChange">
                                <FormControl
                                    type="text"
                                    placeholder="alter Master Code"
                                    value={this.state.OldCode}
                                    onChange={this.onChangeOldCode}
                                />
                              <br />
                                <FormControl
                                    type="text"
                                    placeholder="neuer Master Code"
                                    value={this.state.NewCode}
                                    onChange={this.onChangeCode}
                                />
                              <Button onClick={() =>  this.changeMaster(this.state.OldCode, this.state.NewCode)}>
                                Code anpassen
                                </Button>
                            </FormGroup>
                        </Row>
                    </Grid>
            </Jumbotron>
        );
    }
}
