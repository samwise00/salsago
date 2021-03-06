import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { CardSection, Card, Button } from './common';

const EventDetail = ({ event }) => {
  const { title, date, image, link } = event;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
          style={thumbnailStyle}
          source={{ uri: image }}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{title}</Text>
          <Text>{date}</Text>
        </View>
      </CardSection>

      <CardSection>
          <Image
            style={imageStyle}
            source={{ uri: image }}
          />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(link)}>
          Buy Now
        </Button>
      </CardSection>
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
    height: 300,
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

export default EventDetail;
