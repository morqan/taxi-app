import React, { Component } from 'react'
import { Switch, View } from 'react-native'
import { connect } from 'react-redux'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddCrediCardScreenStyle'

import MyButton from '../Components/MyButton'

class AddCrediCardScreen extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, ' '));
  _onFocus = (field) => console.log('focusing', field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });
  render () {
    return (
      <View style={styles.container}>
        <Switch
          style={styles.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} />

        {this.state.useLiteCreditCardInput
          ? (
            <LiteCreditCardInput
              autoFocus
              inputStyle={styles.input}

              validColor={'black'}
              invalidColor={'red'}
              placeholderColor={'darkgray'}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={styles.label}
              inputStyle={styles.input}
              validColor={'black'}
              invalidColor={'red'}
              placeholderColor={'darkgray'}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
        <View style={styles.btnBox}>
          <MyButton
            text='OK'
            color='#fff'
            backgroundColor='#451E5D' />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCrediCardScreen)
