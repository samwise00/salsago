import { Components, Audio } from 'exponent';
import React, { Component} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
//import { Components } from 'exponent';
//import { Actions } from 'react-native-router-flux';
//import { connect } from 'react-redux';
import { VideoPlayer } from '../VideoPlayer';
import { CardSection, Button, Confirm } from '../common';
//import { bundleFetch } from '../../actions';

class MusicPlayground extends Component {
  static navigationOptions = {
    title: 'Music Playground',
    tabBar: {
      showLabel: false,
      icon: () => (
        <Image
          source={require('../../assets/music.png')}
          style={styles.icon}
        />
      )
    }
  }

  state = { videoPlayerShown: false, showModal: false }

  componentWillMount() {
    return Audio.setIsEnabled(false);
  }
  consoleLog() {
    return console.log(this.state);
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
          source='https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/LA%20LLAVE%20-%20LATIN%20VIBE.3gp?alt=media&token=8ff0c8dc-e325-4e30-a16e-8e9387f16eb7'
          onEnd={this.toggleVideoPlayerState.bind(this)}
          style={{ width: Dimensions.get('window').width, height: '50' }}
          resizeMode='cover'
        />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView>
          <CardSection>
            <Button onPress={this.toggleVideoPlayerState.bind(this)}>La Llave - Grupo Latin Vibe</Button>
          </CardSection>
          {this.renderVideo()}
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Linda Mujer - El Timba</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Mi Bomba Sono - Alfredo Linares</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Via - Al DeLory</Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Tu Sin Mi - Jehu El Rey</Button>
          </CardSection>

          <Confirm
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          visible={this.state.showModal}
          >
          Purchase pro version to unlock all content
          </Confirm>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28
  }
});
//export default connect(null, { bundleFetch })(BeginnerBundle);

export default MusicPlayground;
