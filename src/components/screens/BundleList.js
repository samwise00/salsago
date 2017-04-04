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
    title: 'Bundle List',
  }

  onBeginnerButtonPress() {
    return this.props.navigation.navigate('BeginnerBundleScreen');
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Beginner</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Intermediate</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Advanced</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onBeginnerButtonPress.bind(this)}>Spins and Turns</Button>
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
