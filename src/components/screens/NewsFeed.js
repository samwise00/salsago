import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { CardSection, Card, Button } from '../common';

class NewsFeed extends Component {
  static navigationOptions = {
    title: 'News and Events',
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView>
          <Card>
            <CardSection>
              <Text style={styles.titleStyle}>Featured November Bundle: Spin Practice!</Text>
            </CardSection>
            <CardSection>
              <Text>Learn, practice and brush up on your spins by our featured monthly bundle. Taught by Wil Nieves and Nova Landeaus.</Text>
            </CardSection>
            <CardSection>
              <Button>Unlock Now</Button>
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Text style={styles.titleStyle}>Join us this September at the New York International Salsa Congress!</Text>
            </CardSection>
            <CardSection>
              <Text>The New York International Salsa Congress is New York City's PREMIER Latin dance and music event where the world comes to dance no matter your style and/or age, whether you're an amateur or professional dancer. </Text>
            </CardSection>
            <CardSection>
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/15252602_10154025985081867_6299447087889254339_o.jpg?alt=media&token=0fcd3376-9130-4a39-a837-b3a1f5aa7315' }}
                style={styles.image}
              />
            </CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
//export default connect(null, { bundleFetch })(BeginnerBundle);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: '14'
  }
});

export default NewsFeed;
