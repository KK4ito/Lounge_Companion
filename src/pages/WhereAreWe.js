import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, ButtonToolbar } from 'react-bootstrap';

const NOUVEM_LOUNGE = {
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
    this.panToLounge = this.panToLounge.bind(this);
    this.panToMe = this.panToMe.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.setUserLocation = this.setUserLocation.bind(this);
    this.failedToGetUserLocation = this.failedToGetUserLocation.bind(this);
    this.setDirection = this.setDirection.bind(this);
  }


    componentDidMount() {
      this.setState({
        map: new window.google.maps.Map(this.refs.map, {
          center: NOUVEM_LOUNGE,
          zoom: 16
        }),
        marker: new window.google.maps.Marker({
          position: NOUVEM_LOUNGE,
          map: this.state.map,
          title: 'Nouvem Lounge'
        }),
        infoWindow: new window.google.maps.InfoWindow({
          map: this.state.map
        }),
        });
    }

    panToLounge() {

      this.state.map.panTo(NOUVEM_LOUNGE);
      this.state.marker.setMap(this.state.map);
    }

    panToMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => this.setUserLocation(position)
          ,
          () =>    this.failedToGetUserLocation(),
        );

      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.state.infoWindow, this.state.map.getCenter());
      }
    }

    setUserLocation(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setState({
          ownPosi: new window.google.maps.Marker({
          position: pos,
          map: this.state.map,
          title: 'My current location'
        }),
      });

      this.state.map.panTo(pos);
      this.state.ownPosi.setMap(this.state.map);
      this.state.map.setCenter(pos);
    }

    failedToGetUserLocation() {
        this.handleLocationError(true, this.state.infoWindow, this.state.map.getCenter());
    }
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      this.state.infoWindow.setPosition(pos);
      this.state.infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
    setDirection() {
      console.log('setDirection entered');
      let directionDisplay = new window.google.maps.DirectionsRenderer();
      let directionService = new window.google.maps.DirectionsService();
      directionDisplay.setMap(this.state.map);

      let requestWay = {
        origin: this.state.marker.position,
        destination: this.state.ownPosi.position,
        travelMode: 'WALKING',
      }
      directionService.route(requestWay, function(result, status){
        if (status == window.google.maps.DirectionsStatus.OK) {
          directionDisplay.setDirections(result);
        }
      });
    }
    render() {
      const mapStyle = {
        width: 1300,
        height: 650,
        border: '1px solid black'
      };
      let directionButton = null;
      if (this.state.ownPosi) {
        directionButton = <Button onClick={this.setDirection}>Draw Line</Button>;
      } else {
        directionButton = <Button disabled onClick={this.setDirection}>Draw Line</Button>;
      }

      return (
        <Jumbotron>
          <h1>{this.state.Title}</h1>
          <ButtonToolbar>
          <Button onClick={this.panToLounge}>Show me your moves</Button>
          <Button onClick={this.panToMe}>Show me where I am</Button>
          {directionButton}
          </ButtonToolbar>
          <div ref="map" style={mapStyle}>Error I should be a map!</div>
         <div ref="panel"></div>
       </Jumbotron>
      );
    }
  }
