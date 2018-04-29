import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class Maps extends Component {
  render() {
    return (<div id="map">
      <Map style={{
          width: '100%',
          height: '60%',
          position: 'relative'
      }} google={this.props.google} initialCenter={{
          lat: 49.781641,
          lng: 9.970359
      }} zoom={17} clickableIcons={false}>
        <Marker onClick={this.onMarkerClick} name={'Current location'}/>
      </Map>
    </div>);
  }

}

export default GoogleApiWrapper({apiKey: "AIzaSyDLXJWBg4erodb8JOpJs8UozSPY8pGU6Pk"})(Maps)
