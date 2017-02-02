import { Components } from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

const VideoPlayer = ({ source, onEnd }) => {
    return (
      <View style={styles.container}>
          <Components.Video
            source={{ uri: source }}
            fullscreen
            onEnd={onEnd}
            volume={0.1}
          />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export { VideoPlayer };
