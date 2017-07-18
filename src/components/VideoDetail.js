import React from 'react';
import { Text, View, Image, Linking, Dimensions } from 'react-native';
import { CardSection, Card, Button } from './common';
import { VideoPlayer } from './VideoPlayer';

const VideoDetail = ({ videoList, videoToggle, renderVideo }) => {
  const { title, imageUrl, linkUrl } = videoList;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles

  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>
      <CardSection>
          <Button onPress={videoToggle}>Beginner</Button>
      </CardSection>
      {renderVideo}
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  imageStyle: {
    height: Dimensions.get('window').height / 7,
    flex: 1,
    width: null
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default VideoDetail;
