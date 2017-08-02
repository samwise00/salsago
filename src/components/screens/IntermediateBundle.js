import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import axios from 'axios';
import MediaPlayer from '../MediaPlayer';
import { CardSection, Button, Confirm } from '../common';
import VideoDetail from '../VideoDetail';


class IntermediateBundle extends Component {
  static navigationOptions = {
    title: 'Intermediate Bundle',
    tabBarLabel: 'Lessons'
  }

  state = { videoPlayerShown: false, showModal: false, videoList: [] }

  componentWillMount() {
    this.fetchListItems();
  }

  onAccept() {
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  toggleVideoPlayerState = () => {
    console.log("hi")
    this.setState({ videoPlayerShown: !this.state.videoPlayerShown });
  }

  onVideoButtonPress() {
    return this.props.navigation.navigate('MediaPlayer');
  }

  fetchListItems() {
    axios.get('https://salsago-d79b9.firebaseio.com/bundles/intermediate.json')
      .then((response) => {
        const arr = [];
        for (const i in response.data) {
          arr.push(response.data[i]);
        }
        this.setState({ videoList: arr });
      });
  }

  renderVideoList() {
    return this.state.videoList.map(videoList =>
      <VideoDetail
        key={videoList.title}
        videoList={videoList}
        videoToggle={this.toggleVideoPlayerState.bind(this)}
        renderVideo={this.renderVideo(videoList.linkUrl)}
      />
    );
  }

  renderVideo() {
    if (this.state.videoPlayerShown === true) {
      /*return (
        <MediaPlayer />
      );*/
      console.log('poo')
      return this.props.navigation.navigate('MediaPlayerScreen');
    }
  }

  //source="https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/Nieves%20Dance%20Company%20%40%20LCL%20March%2020th%202016.mp4?alt=media&token=c6108ccc-bcf7-4d8e-9200-f3547bd481f1"


  render() {
    return (
      <ScrollView>
        {this.renderVideoList()}
      </ScrollView>
    );
  }
}
/*
<Confirm
onAccept={this.onAccept.bind(this)}
onDecline={this.onDecline.bind(this)}
visible={this.state.showModal}
>
Placeholder text
</Confirm>
*/

//export default connect(null, { bundleFetch })(BeginnerBundle);

export default IntermediateBundle;
