import React, { Component } from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';

class Maps extends Component {
  //initalZoomExecuted = false;

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.longitude !== nextProps.longitude || this.props.latitude !== nextProps.latitude || this.props.route !== nextProps.route) {
      return true;
    } else {
      return false;
    }
  }


  getPositionMarker() {
    if (this.props.longitude !== undefined && this.props.latitude !== undefined) {

      return <Marker position={{ lat: this.props.latitude, lng: this.props.longitude }} name={'Current location'} title={'Current location'}
        icon={{
          url: require("assets/img/mapsicons/telemetryPosition.png"),
          anchor: new window.google.maps.Point(33, 56),
          scaledSize: new window.google.maps.Size(64, 64)
        }}
      />

    }
  }
  getHomePointMarker() {
    for (let i = 0; i < this.props.route.length; i++) {
      const element = this.props.route[i];
      if (element.type === "HOMEPOINT") {
        return <Marker position={{ lat: element.lat, lng: element.lng }} name={'Homepoint'} title={'Homepoint'}
          icon={{
            url: require("assets/img/mapsicons/homePoint.png"),
            anchor: new window.google.maps.Point(33, 56),
            scaledSize: new window.google.maps.Size(64, 64)
          }}
        />
      }
    }
  }
  getTakeoffMarker() {
    for (let i = 0; i < this.props.route.length; i++) {
      const element = this.props.route[i];
      if (element.type === "TAKEOFF") {
        return <Marker position={{ lat: element.lat, lng: element.lng }} name={'Takeoff'} title={'Takeoff'}
          icon={{
            url: require("assets/img/mapsicons/takeoff.png"),
            anchor: new window.google.maps.Point(33, 56),
            scaledSize: new window.google.maps.Size(64, 64)
          }}
        />
      }
    }
  }
  getLandMarker() {
    for (let i = 0; i < this.props.route.length; i++) {
      const element = this.props.route[i];
      if (element.type === "LAND") {
        return <Marker position={{ lat: element.lat, lng: element.lng }} name={'Land'} title={'Land'}
          icon={{
            url: require("assets/img/mapsicons/land.png"),
            anchor: new window.google.maps.Point(33, 56),
            scaledSize: new window.google.maps.Size(64, 64)
          }}
        />
      }
    }
  }
  getInitialZoom() {
    if (this.props.route !== undefined && this.props.route[0] !== undefined) {
      //console.log("route json: "+JSON.stringify(this.props.route));
      // this.initalZoomExecuted = true;
      var north = {
        lat: this.props.route[0].lat,
        lng: this.props.route[0].lng
      };
      var east = {
        lat: this.props.route[0].lat,
        lng: this.props.route[0].lng
      };
      var south = {
        lat: this.props.route[0].lat,
        lng: this.props.route[0].lng
      };
      var west = {
        lat: this.props.route[0].lat,
        lng: this.props.route[0].lng
      };
      for (let i = 0; i < this.props.route.length; i++) {
        const element = this.props.route[i];
        if (north.lat < element.lat) {
          north = element;
        }
        if (south.lat > element.lat) {
          south = element;
        }
        if (west.lng > element.lng) {
          west = element;
        }
        if (east.lng < element.lng) {
          east = element;
        }
      }
      var points = [north, east, south, west]
      var bounds = new this.props.google.maps.LatLngBounds();
      //console.log("bounds: " + JSON.stringify(points));
      // points = [
      //   {lat:-29.94531,
      //   lng: 146.12376
      //   },

      //   {lat:-29.7928,
      //   lng: 150.56224
      //   },
      //   {lat:-33.8976,
      //   lng: 149.9030
      //   },
      //   {lat:-33.165,
      //   lng: 140.5427
      //   }

      // ];
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      return bounds;
    } else {
      return new this.props.google.maps.LatLngBounds();
    }
  }

  mapDragged() {
    //TODO: disable auto center
  }
  getRoute() {
    if (Array.isArray(this.props.route)) {
      return <Polyline
        fillColor="#D41313"
        fillOpacity={0.35}
        path={this.props.route.filter(coord => coord.type !== "TAKEOFF" && coord.type !== "HOMEPOINT")}
        strokeColor="#D41313"
        strokeOpacity={0.8}
        strokeWeight={3}
      />
    }
  }
  getHomePointRoute() {
    if (Array.isArray(this.props.route)) {
      var homePointIndex = this.props.route.findIndex(coord => coord.type === "HOMEPOINT");
      var wayPointIndex = this.props.route.findIndex(coord => coord.type === "WAYPOINT");
      var homePointPath = [this.props.route[homePointIndex], this.props.route[wayPointIndex]];
      return <Polyline
        fillColor="#686868"
        fillOpacity={0.35}
        path={homePointPath}
        strokeColor="#686868"
        strokeOpacity={0.6}
        strokeWeight={3}
      />
    }
  }

  getTelemetryPath() {
    if (Array.isArray(this.props.telemetryPath)) {
      return <Polyline
        fillColor="#ed8721"
        fillOpacity={0.35}
        path={this.props.telemetryPath}
        strokeColor="#ed8721"
        strokeOpacity={0.8}
        strokeWeight={3}
      />
    }

  }
  getWaypointDots() {
    var retRows = [];
    var p = 0;
    for (let i = 0; i < this.props.route.length; i++) {
      const element = this.props.route[i];
      if (element.type === "WAYPOINT") {
        retRows[p] = <Marker position={{ lat: element.lat, lng: element.lng }} name={'Waypoint'} title={element.altitude + " m"}
          icon={{
            url: require("assets/img/mapsicons/WaypointDot.png"),
            anchor: new window.google.maps.Point(6, 6),
            scaledSize: new window.google.maps.Size(12, 12)
          }}
        />
        p++;
      }
    }
    return retRows;
  }

  getCurrentWaypoint() {
   // console.log("was los: "+this.props.currentWaypoint);
    if (this.props.currentWaypoint !== undefined && this.props.currentWaypoint !== null && this.props.currentWaypoint < this.props.route.length && this.props.currentWaypoint >= 0) {
      //console.log("betreten: "+this.props.route[this.props.currentWaypoint].lat);
      return <Marker position={{ lat: this.props.route[this.props.currentWaypoint].lat, lng: this.props.route[this.props.currentWaypoint].lng }} name={'Current Waypoint'} title="Current Waypoint"
        icon={{
          url: require("assets/img/mapsicons/currentWaypoint.png"),
          anchor: new window.google.maps.Point(33, 56),
          scaledSize: new window.google.maps.Size(64, 64)
        }}
      />
    }
  }

  centerOnNewTelemetry() {

  }
  getCenterPosition() {
    var pos = this.getInitialZoom().getCenter();
    //console.log("center pos: " + JSON.stringify(pos));
    return pos;
  }
  render() {
    var initalCenterPosition = this.getCenterPosition();
    //console.log("initalCenterPosition: " + JSON.stringify(initalCenterPosition));
    return (<div id="map">
      <Map
        center={initalCenterPosition}
        onDragend={this.mapDragged}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }} google={this.props.google}
        initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }}

        clickableIcons={false}
      //bounds={this.getInitialZoom()}
      //TODO: Center wieder einbauen wenn neue Telemetrie vorliegt
      >
        {this.getHomePointMarker()}
        {this.getTakeoffMarker()}
        {this.getLandMarker()}
        {this.getPositionMarker()}
        {this.getWaypointDots()}
        {this.getCurrentWaypoint()}
        {this.getRoute()}
        {this.getHomePointRoute()}
        {this.getTelemetryPath()}

      </Map>
    </div>);
  }

}

export default GoogleApiWrapper({ apiKey: "AIzaSyDLXJWBg4erodb8JOpJs8UozSPY8pGU6Pk" })(Maps)
