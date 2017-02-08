import { Components } from 'exponent';
import React, { Component } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
//import { Components } from 'exponent';
//import { Actions } from 'react-native-router-flux';
//import { connect } from 'react-redux';
import { VideoPlayer } from '../VideoPlayer';
import { CardSection, Button } from '../common';
//import { bundleFetch } from '../../actions';

class BeginnerBundle extends Component {

  state = { videoPlayerShown: false }

  toggleVideoPlayerState = () => {
    this.setState({ videoPlayerShown: !this.state.videoPlayerShown });
  }

  consoleLog() {
    return console.log(this.state);
  }


  renderVideo() {
    if (this.state.videoPlayerShown === true) {
      return (
        <VideoPlayer
          source='https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/Nieves%20Dance%20Company%20%40%20LCL%20March%2020th%202016.mp4?alt=media&token=c6108ccc-bcf7-4d8e-9200-f3547bd481f1'
          onEnd={this.toggleVideoPlayerState.bind(this)}
        />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
        <ScrollView>
          <CardSection>
            <Button onPress={this.toggleVideoPlayerState.bind(this)}>Basic Step</Button>
          </CardSection>
          {this.renderVideo()}
          <CardSection>
            <Button onPress={this.consoleLog.bind(this)}>Basic Step</Button>
          </CardSection>
        </ScrollView>
      </View>
    );
  }
}

//export default connect(null, { bundleFetch })(BeginnerBundle);

export default BeginnerBundle;
