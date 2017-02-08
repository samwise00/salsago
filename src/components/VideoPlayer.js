import { Components } from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const VideoPlayer = ({ source, onEnd }) => {
    return (
      <View style={styles.container}>
          <Components.Video
            source={{ uri: source }}
            volume={0.1}
            fullscreen
            oneEnd={onEnd}
          />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export { VideoPlayer };
