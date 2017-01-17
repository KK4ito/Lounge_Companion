import React from 'react';
import { Jumbotron, Button, ButtonToolbar } from 'react-bootstrap';

// Coordinates of Novum Lounge
const NOVUM_LOUNGE = {
  lat: 47.480421,
  lng: 8.210647
};

export default class WhereAreWe extends React.Component {
  constructor() {
    super();
    this.state = {
      Title: 'Wo wir sind',
      map: null,
      marker: null,
      ownPosi: null,
      infoWindow: null,
    };
    this.panToMe = this.panToMe.bind( this );
    this.handleLocationError = this.handleLocationError.bind( this );
    this.setUserLocation = this.setUserLocation.bind( this );
    this.failedToGetUserLocation = this.failedToGetUserLocation.bind( this );
    this.setDirection = this.setDirection.bind( this );
  }

  componentDidMount() {
    this.setState( {
      map: new window.google.maps.Map( this.refs.map, {
        center: NOVUM_LOUNGE,
        zoom: 16
      } ),
      marker: new window.google.maps.Marker( {
        position: NOVUM_LOUNGE,
        map: this.state.map,
        title: 'Novum Lounge'
      } ),
      infoWindow: new window.google.maps.InfoWindow( {
        map: this.state.map
      } ),
    } );
  }
  componentDidUpdate() {
    // Move the map to center on the novum lounge and set a marker
    this.state.map.panTo( NOVUM_LOUNGE );
    this.state.marker.setMap( this.state.map );

  }

  // try to get location from client and set a marker
  panToMe() {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setUserLocation( position ),
        () => this.failedToGetUserLocation()
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError( false, this.state.infoWindow, this.state.map.getCenter() );
    }
  }

  // set the current pos to the position returned from the browser and center the map
  setUserLocation( position ) {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    this.setState( {
      ownPosi: new window.google.maps.Marker( {
        position: pos,
        map: this.state.map,
        title: 'My current location'
      } ),
    } );

    this.state.map.panTo( pos );
    this.state.ownPosi.setMap( this.state.map );
    this.state.map.setCenter( pos );
  }

  failedToGetUserLocation() {
    this.handleLocationError( true, this.state.infoWindow, this.state.map.getCenter() );
  }

  // show an error if the location could not be retrieved
  handleLocationError( browserHasGeolocation, infoWindow, pos ) {
    this.state.infoWindow.setPosition( pos );
    this.state.infoWindow.setContent( browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.' );
  }

  // show the shortest route for walking from current loc to lounge
  setDirection() {
    let directionDisplay = new window.google.maps.DirectionsRenderer();
    let directionService = new window.google.maps.DirectionsService();
    directionDisplay.setMap( this.state.map );

    let requestWay = {
      origin: this.state.ownPosi.position,
      destination: this.state.marker.position,
      travelMode: 'WALKING',
    };

    // Calculate directions with the help of direction api
    directionService.route( requestWay, function ( result, status ) {
      if ( status === window.google.maps.DirectionsStatus.OK ) {
        // Show directions on the map
        directionDisplay.setDirections( result );
      }
    } );

    // Remove previous markers
    this.state.ownPosi.setMap( null );
    this.state.marker.setMap( null );
  }

  render() {
    const mapStyle = {
      border: '1px solid black'
    };
    let directionButton = null;
    // enable the draw line button after a position is set.
    if ( this.state.ownPosi ) {
      directionButton = (<Button onClick={ this.setDirection }>Draw Line</Button>);
    } else {
      directionButton = <Button disabled onClick={ this.setDirection }>Draw Line</Button>;
    }
    return (
    // Build the maps canvas with the buttons above
    <Jumbotron>
      <h1>{ this.state.Title }</h1>
      <ButtonToolbar>
        <Button onClick={ this.panToMe }>
          Locate me
        </Button>
        { directionButton }
      </ButtonToolbar>
      <div
           className="map-responsive"
           ref="map"
           style={ mapStyle }>
        Error I should be a map!
      </div>
    </Jumbotron>
    );
  }
}
