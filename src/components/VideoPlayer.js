import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

const VideoPlayer = ({ source, style }) => {
    return (
      <View style={styles.container}>
          <Expo.Video
            ref={r=> this.vid = r}
            source={{ uri: source }}
            rate={1.0}
            volume={0.1}
            muted={false}
            resizeMode="RESIZE_MODE_COVER"
            isLooping
            style={style}
            shouldPlay
            useNativeControls
            naturalSize
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
    backgroundColor: '#rgba(0,0,0,0.9)',
    width: 300,
    height: 300
  },

});

export { VideoPlayer };
