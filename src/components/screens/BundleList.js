//import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
//import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
//import { bundleFetch } from '../../actions';

class BundleList extends Component {
  componentWillMount() {
    console.log(this.props);
    //this.props.bundleFetch();
  }

  onBeginnerButtonPress() {
    return this.props.navigation.navigate('BeginnerBundle');
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 22 }}>
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
