import React, { Component } from "react";
import { AppRegistry, Image, View, Button } from "react-native";
import { MapView, Location, Permissions } from "expo";

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class Map extends React.Component {
  state = {
    region: {
      latitude: 55.953251,
      longitude: -3.188267,
      ...deltas
    },
    restaurants: []
  };

  onMapReady = () => {
    this.getLocationAsync();
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage:
          "Unable to access location: Defaulted to Edinburgh location"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const gotRegion = {
      latitude: 40.73061,
      longitude: -73.935242,
      ...deltas
    };
    await this.setState({ region: gotRegion });
  };

  render() {
    console.log(this.state.region);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.state.region}
        onMapReady={this.onMapReady}
      />
    );
  }
}
