import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { VideoPlayer } from '../VideoPlayer';
import { CardSection, Button, Confirm } from '../common';
import VideoDetail from '../VideoDetail';


class BeginnerBundle extends Component {
  static navigationOptions = {
    title: 'Beginner Bundle',
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

  fetchListItems() {
    axios.get('https://salsago-d79b9.firebaseio.com/bundles/beginner.json')
      .then((response) => {
        const arr = [];
        for (const i in response.data) {
          arr.push(response.data[i]);
        }
        this.setState({ videoList: arr });
      });
  }

  makeVideoUrl(url) {
    const newUrl = '"' + url + '""';
    return newUrl
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

  renderVideo(url) {
    console.log(url);
    if (this.state.videoPlayerShown === true) {
      return (
        <VideoPlayer
          source="https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/Nieves%20Dance%20Company%20%40%20LCL%20March%2020th%202016.mp4?alt=media&token=c6108ccc-bcf7-4d8e-9200-f3547bd481f1"
          onEnd={this.toggleVideoPlayerState.bind(this)}
          fullscreen
        />
      );
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

export default BeginnerBundle;
