import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';

class Maps extends Component {

  render() {
    console.log("update: " + JSON.stringify(this.props.route));
    return (<div id="map">
      <Map center={{
        lat: this.props.latitude,
        lng: this.props.longitude
      }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }} google={this.props.google} initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }} zoom={17} clickableIcons={false}>
        <Marker position={{ lat: this.props.latitude, lng: this.props.longitude }} onClick={this.onMarkerClick} name={'Current location'} />
        
        <Polyline
          fillColor="#0000FF"
          fillOpacity={0.35}
          path={this.props.route}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      </Map>
    </div>);
  }

}

export default GoogleApiWrapper({ apiKey: "AIzaSyDLXJWBg4erodb8JOpJs8UozSPY8pGU6Pk" })(Maps)
