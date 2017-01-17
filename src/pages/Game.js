import React from 'react';
import { Jumbotron, ListGroup, ListGroupItem, FormControl, FormGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import Notifications, { notify} from 'react-notify-toast';
import ReCAPTCHA from 'react-google-recaptcha';

// Variable for captcha instance, needed for resetting
let recaptchaInstance;

export default class Game extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      captchaOK: null,
      url: 'https://64.137.190.213/LoungeCompanionREST/src/public/index.php/teams',
      Teams: [],
      toDelete: null,
      NewCode: '',
      OldCode: '',
      formDeleteValue: '',
      formCreateName: '',
      formCreateCode: '',
    };
    this.captchaChanged = this.captchaChanged.bind( this );
    this.deleteTeam = this.deleteTeam.bind( this );
    this.createTeam = this.createTeam.bind( this );
    this.changeMaster = this.changeMaster.bind( this );
    this.onChangeDelete = this.onChangeDelete.bind( this );
    this.onChangeCreateCode = this.onChangeCreateCode.bind( this );
    this.onChangeCreateName = this.onChangeCreateName.bind( this );
    this.onChangeCode = this.onChangeCode.bind( this );
    this.onChangeOldCode = this.onChangeOldCode.bind( this );
    this.resetFields = this.resetFields.bind( this );
  }

  // fetch teams from API
  componentDidMount() {
    fetch( this.state.url, {
      method: 'GET',
    } )
      .then( response => response.json() )
      .then( json => this.setState( {
        Teams: json
      } ) );
  }

  // check and verify captcha
  captchaChanged( value ) {
    this.setState( {
      captchaOK: !!value
    } );
  }

  resetFields() {
    recaptchaInstance.reset();
    this.setState( {
      captchaOK: false
    } );
  }
  //check code of team to delete and delete if it matches
  deleteTeam( value ) {
    if ( this.state.toDelete && ((value === this.state.toDelete.code) || (value === this.state.Teams[ 0 ].code)) ) {
      fetch( this.state.url + '/' + this.state.toDelete.id, {
        method: 'DELETE',
      } )
        .then( res => res.json() )
        .then( output => {
          if ( output ) {
            notify.show( 'Team gelöscht', 'success' );
            this.resetFields();
            this.setState( {
              formDeleteValue: ''
            } );
            fetch( this.state.url, {
              method: 'GET',
            } )
              .then( response => response.json() )
              .then( json => this.setState( {
                Teams: json
              } ) )
              .then( () => this.setState( {
                toDelete: null
              } ) );
          }
        } );
    } else {
      notify.show( 'Error Code', 'error' );
    }
  }

  //create a new Team and push it to the API via POST request
  createTeam( name, code ) {
    if ( name && code ) {
      let request = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          name: name,
          code: code,
        } ),
      };
      fetch( this.state.url, request )
        .then( res => res.json() )
        .then( output => this.setState( {
          Teams: this.state.Teams.concat( [
            output
          ] )
        } ) )
        .then( () => this.resetFields() )
        .then( () => this.setState( {
          formCreateCode: '',
          formCreateName: '',
        } ) );
      notify.show( 'Team erstellt', 'success' );
    }
  }

  changeMaster( oldCode, newCode ) {
    if (!oldCode || !newCode) {
      notify.show( 'Missing input', 'warning' );
      return;
    }
      // check code input for master code, which is stored in the master team
      let request = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          code: newCode,
        } ),
      };
      fetch( this.state.url + '/0', request )
        .then( res => res.json() )
        .then( output => notify.show( 'Mastercode geändert', 'success' ) );

      this.resetFields();
      this.setState( {
        NewCode: '',
        OldCode: '',
      } );
  }

  onChangeDelete( e ) {
    this.setState( {
      formDeleteValue: e.target.value,
      formCreateCode: '',
      formCreateName: '',
      NewCode: '',
      OldCode: ''
    } );
  }

  onChangeCreateCode( e ) {
    this.setState( {
      formDeleteValue: '',
      formCreateCode: e.target.value,
      NewCode: '',
      OldCode: ''
    } );
  }

  onChangeCreateName( e ) {
    this.setState( {
      formDeleteValue: '',
      formCreateName: e.target.value,
      NewCode: '',
      OldCode: ''
    } );
  }

  onChangeCode( e ) {
    this.setState( {
      formDeleteValue: '',
      formCreateCode: '',
      formCreateName: '',
      NewCode: e.target.value,
    } );
  }

  onChangeOldCode( e ) {
    this.setState( {
      formDeleteValue: '',
      formCreateCode: '',
      formCreateName: '',
      OldCode: e.target.value
    } );
  }

  renderComponentClickedTeam() {
    if ( this.state.toDelete ) {
      return (<FormControl.Static>{ this.state.toDelete.name }< /FormControl.Static>);
    } else {
      return (<FormControl.Static>Hier sollte das angeklickte Team stehen</FormControl.Static>);
    }
  }

  renderComponentPlayingTeam() {
    if ( this.state.Teams[ 1 ] && this.state.Teams[ 2 ] ) {
      return (<FormControl.Static>{ this.state.Teams[ 1 ].name } vs { this.state.Teams[ 2 ].name }< /FormControl.Static>);
    } else {
      return (<FormControl.Static>Nicht genügend Teams vorhanden</FormControl.Static>);
    }
  }

  render() {
    // Prepare element for clicked team
    let clickedTeam = this.renderComponentClickedTeam();

    // Prepare element for first two playing teams
    let playingTeam = this.renderComponentPlayingTeam();

    // Prepare captcha elements
    let captchaObject = (<center>
                          < ReCAPTCHA
                                      ref={ e => recaptchaInstance = e }
                                      sitekey="6LfArg8UAAAAAERQ_A1e32q4f1Ti-ZbXLwuUOkug"
                                      onChange={ this.captchaChanged }
                                      className="captchaMargin"
                          />
                      </center>);
    return (
    <Jumbotron>
      <Notifications />
      <h1>Toeggele</h1>
      <Grid>
        { /* shows current teams and current match */ }
        <Row className="show-grid">
          <Col className="col-md-6">
          <h2>angemeldete Teams</h2>
          <ListGroup>
            { this.state.Teams.slice(1).map( function ( team, index ) {
                  return <ListGroupItem
                                        key={ index }
                                        onClick={ () => this.setState({toDelete: team})}>
                           { team.name }
                         </ListGroupItem>
              }, this ) }
          </ListGroup>
          </Col>
          <Col className="col-md-6">
          <FormGroup>
            <h2>Zurzeit spielt</h2>
            { playingTeam }
            <FormControl.Static>
              Das Team, welches verloren hat, meldet sich ab
            </FormControl.Static>
          </FormGroup>
          </Col>
        </Row>
        { /* form to delete team with code */ }
        <Row className="show-grid">
          <h2>Abmelden</h2>
          <FormGroup controlId="formDelete">
            { clickedTeam }
            <FormControl
                         type="password"
                         placeholder="Gib deinen Code ein"
                         value={ this.state.formDeleteValue }
                         onChange={ this.onChangeDelete } />
                       { this.state.formDeleteValue && captchaObject }
            <Button
                    disabled={ !this.state.captchaOK }
                    onClick={ () => this.deleteTeam( this.state.formDeleteValue ) }>
              Abmelden
            </Button>
          </FormGroup>
        </Row>
        { /* form to create team */ }
        <Row className="show-grid">
          <h2>Anmelden</h2>
          <FormGroup controlId="formCreate">
            <FormControl.Static>
              Mit dem Code, der hier angegeben wird, kann später das Team sich wieder abmelden
            </FormControl.Static>
            <FormControl
                         type="text"
                         placeholder="Gib deinen Teamnamen an"
                         value={ this.state.formCreateName }
                         onChange={ this.onChangeCreateName } />
            <FormControl
                         type="password"
                         placeholder="Gib deinen Code ein"
                         value={ this.state.formCreateCode }
                         onChange={ this.onChangeCreateCode } />
                       { this.state.formCreateName && this.state.formCreateCode && captchaObject }
            <Button
                    disabled={ !this.state.captchaOK }
                    onClick={ () => this.createTeam( this.state.formCreateName, this.state.formCreateCode ) }>
              Anmelden
            </Button>
          </FormGroup>
        </Row>
        { /* form to change master code */ }
        <Row className="show-grid">
          <h2>Master Code aendern</h2>
          <FormGroup controlId="fromChange">
            <FormControl
                         type="password"
                         placeholder="alter Master Code"
                         value={ this.state.OldCode }
                         onChange={ this.onChangeOldCode } />
            <FormControl
                         type="password"
                         placeholder="neuer Master Code"
                         value={ this.state.NewCode }
                         onChange={ this.onChangeCode } />
                       { this.state.NewCode && this.state.OldCode && captchaObject }
            <Button
                    disabled={ !this.state.captchaOK }
                    onClick={ () => this.changeMaster( this.state.OldCode, this.state.NewCode ) }>
              Code anpassen
            </Button>
          </FormGroup>
        </Row>
      </Grid>
    </Jumbotron>
    );
  }
}
