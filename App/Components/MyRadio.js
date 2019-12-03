import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/MyRadioStyle'

export default class MyRadio extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  constructor() {
    super();
  }
  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.8} style={
          this.props.button.selected
            ? styles.radioButtonChecked
            : styles.radioButton}>
          <View style={[styles.radioButtonHolder, { height: this.props.button.size, width: this.props.button.size, borderColor: this.props.button.color }]}>
            <Image style={styles.radioImage} source={this.props.button.image} />
          </View>
          <Text style={[styles.label, { color: this.props.button.color }]}>{this.props.button.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
