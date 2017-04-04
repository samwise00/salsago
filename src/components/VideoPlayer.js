import { Components } from 'expo';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

const VideoPlayer = ({ source, onEnd, fullscreen, style, resizeMode }) => {
    return (
      <View style={styles.container}>
          <Components.Video
            source={{ uri: source }}
            volume={0.1}
            fullscreen={fullscreen}
            oneEnd={onEnd}
            style={style}
            resizeMode={resizeMode}
            canPlayFastForward
            fullscreen={fullscreen}
          />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export { VideoPlayer };
