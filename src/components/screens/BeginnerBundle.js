import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import { VideoPlayer } from '../VideoPlayer';
import { CardSection, Button, Confirm } from '../common';

class BeginnerBundle extends Component {
  static navigationOptions = {
    title: 'Beginner Bundle',
  }

  state = { videoPlayerShown: false, showModal: false, }

  componentDidMount() {
    console.log('beginner bundle component rendered')
  }

  componentDidUpdate() {
    console.log("navigation prop" + this.props.navigation.state.routeName)
  }

  componentWillUnmount() {
    console.log("component about to unmount")
  }

  onAccept() {
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  lockedItemPress() {

  }

  toggleVideoPlayerState = () => {
    this.setState({ videoPlayerShown: !this.state.videoPlayerShown });
  }

  renderVideo() {
    if (this.state.videoPlayerShown === true) {
      return (
        <VideoPlayer
          source='https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/Nieves%20Dance%20Company%20%40%20LCL%20March%2020th%202016.mp4?alt=media&token=c6108ccc-bcf7-4d8e-9200-f3547bd481f1'
          onEnd={this.toggleVideoPlayerState.bind(this)}
          fullscreen
        />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView>
          <CardSection>
            <Button onPress={this.toggleVideoPlayerState.bind(this)}>Basic Step</Button>
          </CardSection>
          {this.renderVideo()}
          <CardSection>
            <Button>Cross Body Lead</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.purchaseBeginnerBundle}>Right Turn</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>CBL + Right Turn</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Hammer Lock</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Cab Driver</Button>
          </CardSection>

          <Confirm
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          visible={this.state.showModal}
          >
          Placeholder text
          </Confirm>


        </ScrollView>
      </View>
    );
  }
}

//export default connect(null, { bundleFetch })(BeginnerBundle);

export default BeginnerBundle;
