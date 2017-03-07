import React from 'react';
import { Text, View, Image, Linking, Dimensions } from 'react-native';
import { CardSection, Card, Button } from './common';

const NewsDetail = ({ event }) => {
  const { title, date, imageUrl, linkUrl } = event;
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
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <CardSection>
          <Image
            style={imageStyle}
            source={{ uri: imageUrl }}
          />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(linkUrl)}>
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

export default NewsDetail;
