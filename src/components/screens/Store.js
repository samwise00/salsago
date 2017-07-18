//import _ from 'lodash';
import React, { Component } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
//import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
//import { bundleFetch } from '../../actions';

class BundleList extends Component {
  static navigationOptions = {
    title: 'Store',
  }

  onBeginnerButtonPress() {
    return this.props.navigation.navigate('BeginnerBundleScreen');
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Unlock Beginner Bundle</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Unlock Intermediate Bundle</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Unlock Advanced Bundle</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Unlock Spins and Turns Bundle</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Shines</Button>
          </CardSection>
        </ScrollView>
      </View>
    );
  }
}
/*
const mapStateToProps = state => {
  const bundles = _.map(state.bundles, (val) => {
    return { ...val }; // { shift: 'Monday', name: "S", id: "324n88"};
  });
  return { bundles };
};

export default connect(mapStateToProps, { bundleFetch })(BundleList);
*/
export default BundleList;
