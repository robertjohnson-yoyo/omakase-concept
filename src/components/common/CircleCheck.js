import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Colors
} from '../../../res/Constants';

export default class CircleCheck extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        this.props.size && {
          borderRadius: this.props.size / 2,
          width: this.props.size,
          height: this.props.size
        },
        this.props.color && {
          backgroundColor: this.props.color
        },
        this.props.style
      ]}>
        <Icon
          size={this.props.size && (this.props.size * 0.6) || 12}
          name="check"
          color={
            this.props.checkColor
            ? this.props.checkColor
            : Colors.AlternateText
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
})
