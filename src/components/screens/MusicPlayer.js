import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Exponent, {
  Asset,
  Audio,
  Font,
} from 'exponent';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, source) {
    this.name = name;
    this.source = source;
    this.sound = null;
  }

  async getLoadedSound() {
    if (this.sound == null) {
      if (typeof source === 'number') { // source is an asset module, so let's download it for better performance
        await Asset.fromModule(this.source).downloadAsync();
      }
      this.sound = new Audio.Sound({ source: this.source });
    }
    return await this.sound.loadAsync();
  }
}

const PLAYLIST = [
  new PlaylistItem(
    'Avenida B - “Llora Como Llore”',
    'https://firebasestorage.googleapis.com/v0/b/salsago-d79b9.appspot.com/o/Avenida%20B%20-%20Llora%20Como%20Llore.mp3?alt=media&token=30af396c-c16e-424f-8120-48aed42b20b5'
  ),
  new PlaylistItem(
    'Mildred Bailey – “All Of Me”',
    'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3'
  ),
  new PlaylistItem(
    'Podington Bear - “Rubber Robot”',
    'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3'
  ),
];

const ICON_PLAY_BUTTON = new Icon(require('../../assets/images/musicplayer/play_button@1x.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('../../assets/images/musicplayer/pause_button@1x.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('../../assets/images/musicplayer/stop_button@1x.png'), 22, 22);
const ICON_FORWARD_BUTTON = new Icon(require('../../assets/images/musicplayer/forward_button@1x.png'), 33, 25);
const ICON_BACK_BUTTON = new Icon(require('../../assets/images/musicplayer/back_button@1x.png'), 33, 25);

const ICON_LOOP_ALL_BUTTON = new Icon(require('../../assets/images/musicplayer/loop_all_button@1x.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new Icon(require('../../assets/images/musicplayer/loop_one_button@1x.png'), 77, 35);

const ICON_MUTED_BUTTON = new Icon(require('../../assets/images/musicplayer/muted_button@1x.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('../../assets/images/musicplayer/unmuted_button@1x.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('../../assets/images/musicplayer/track_1@1x.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../../assets/images/musicplayer/thumb_1@1x.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../../assets/images/musicplayer/thumb_2@1x.png'), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const LOADING_STRING = '... loading ...';

class MusicPlayer extends React.Component {
  static navigationOptions = {
    title: 'Listen',
  }

  constructor(props) {
    super(props);
    this.index = 0;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.volume = 1.0;
    this.state = {
      soundName: '',
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      isPlaying: false,
      isLoading: true,
      fontLoaded: false,
    };
  }

  componentDidMount() {
    Audio.setIsEnabled(true);
    (async () => {
      await Font.loadAsync({ 'cutive-mono-regular': require('../../assets/fonts/CutiveMono-Regular.ttf') });
      this.setState({ fontLoaded: true });
    })();
    this.updateSoundForIndex();
  }

  componentDidUnmount() {
    this.sound.stop();
  }

  updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({ soundName: LOADING_STRING, soundDuration: null, soundPosition: null, isLoading: true });
    } else {
      this.setState({
        soundName: PLAYLIST[this.index].name,
        soundDuration: this.sound.getDurationMillis(),
        isLoading: false,
      });
    }
  }

  _updateScreenForStatus = (status) => {
    this.setState({ soundPosition: status.position_millis, isPlaying: status.is_playing });
  }

  async advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async updateSoundForIndex(playing) {
    if (this.sound != null) {
      await this.sound.unload();
    }
    this.updateScreenForLoading(true);
    this.sound = null;
    const sound = await PLAYLIST[this.index].getLoadedSound();
    await sound.setIsMuted(this.state.muted);
    await sound.setIsLooping(this.state.loopingType === LOOPING_TYPE_ONE);
    await sound.setVolume(this.volume);
    sound.setStatusChangeCallback(this._updateScreenForStatus);
    sound.setPlaybackFinishedCallback(() => {
      this.advanceIndex(true);
      this.updateSoundForIndex(true);
    });
    this.sound = sound;
    this.updateScreenForLoading(false);
    if (playing) {
      await this.sound.play();
    }
  }

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    }
  }

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stop();
    }
  }

  _onForwardPressed = () => {
    if (this.sound != null) {
      this.advanceIndex(true);
      this.updateSoundForIndex(this.state.isPlaying);
    }
  }

  _onBackPressed = () => {
    if (this.sound != null) {
      this.advanceIndex(false);
      this.updateSoundForIndex(this.state.isPlaying);
    }
  }

  _onMutePressed = () => {
    const newValue = !this.state.muted;
    this.setState({ muted: newValue });
    if (this.sound != null) {
      this.sound.setIsMuted(newValue);
    }
  }

  _onLoopPressed = () => {
    const newValue = (this.state.loopingType + 1) % Object.keys(LOOPING_TYPE_ICONS).length;
    this.setState({ loopingType: newValue });
    if (this.sound != null) {
      this.sound.setIsLooping(newValue === LOOPING_TYPE_ONE);
    }
  }

  _onVolumeSliderValueChange = (value) => {
    this.volume = value;
    if (this.sound != null) {
      this.sound.setVolume(value);
    }
  }

  _onSeekSliderValueChange = (value) => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.isPlaying;
      this.sound.pause();
    }
  }

  _onSeekSliderSlidingComplete = async (value) => {
    if (this.sound != null) {
      this.isSeeking = false;
      await this.sound.setPosition(value * this.sound.getDurationMillis());
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.play();
      }
    }
  }

  _getSeekSliderPosition() {
    if (this.sound != null && this.state.soundPosition != null && this.state.soundDuration != null) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (this.sound != null && this.state.soundPosition != null && this.state.soundDuration != null) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return '';
  }

  render() {
    return (
      <View style={styles.container}>
        <View />
        <View style={styles.nameContainer}>
          {
            this.state.fontLoaded ? (
              <Text style={{ ...Font.style('cutive-mono-regular') }}>
                {this.state.soundName}
              </Text>
            ) : null
          }
        </View>
        <View
          style={[styles.playbackContainer, {
            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
          }]}>
          <Slider
            style={styles.playbackSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          {
            this.state.fontLoaded ? (
              <Text style={[styles.timestamp, { ...Font.style('cutive-mono-regular') }]}>
                {this._getTimestamp()}
              </Text>
            ) : null
          }
        </View>
        <View
          style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow, {
            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
          }]}>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={ICON_BACK_BUTTON.module}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={ICON_STOP_BUTTON.module}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={ICON_FORWARD_BUTTON.module}
            />
          </TouchableHighlight>
        </View>
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onMutePressed}>
              <Image
                style={styles.button}
                source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module}
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_2.module}
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onLoopPressed}>
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[this.state.loopingType].module}
            />
          </TouchableHighlight>
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapper: {

  },
  nameContainer: {
    height: DEVICE_HEIGHT * 2.0 / 5.0,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  timestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
});

export default MusicPlayer;
