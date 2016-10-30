import React, {
  Component
} from 'react';
import {
  Image, View, ActivityIndicator, StyleSheet
} from 'react-native';
import Database from '../../utils/Firebase';
import {
  Colors
} from '../../../res/Constants';

export default class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null
    };

    this.setNativeProps = this.setNativeProps.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.uri) {
      this.setState({
        source: props.uri
      });
    } else if (props.photoId) {
      this.ref = Database.ref(
        `photos/${props.photoId}/url`
      )
      this.listener = this.ref.on('value', data => {
        data.exists() && this.setState({
          source: data.val()
        });
      });
    }
  }

  componentWillUnmount() {
    this.ref && this.ref.off('value', this.listener);
  }

  setNativeProps(props) {
    this.c && this.c.setNativeProps(props);
  }

  render() {
    return this.state.source
    ? (
      <Image
        ref={c => this.c = c}
        {...this.props}
        style={[
          styles.container,
          this.props.style
        ]}
        source={{uri: this.state.source}} />
    ): (
      <View
        ref={c => this.c = c}
        {...this.props}
        style={[
          styles.container,
          this.props.style
        ]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Foreground
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
