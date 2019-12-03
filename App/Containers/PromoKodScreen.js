import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'
import CodeInput from 'react-native-code-input'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PromoKodScreenStyle'
import MyButton from '../Components/MyButton'

class PromoKodScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };
  }

  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == '123456') {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );

      this.refs.codeInputRef1.clear();
    }
  }

  _onFinishCheckingCode1 (isValid) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }

  _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      this.setState({ code });
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }

  render () {
    return (
      <View style={styles.container}>

          <View style={styles.kodBox}>
            <Text style={styles.kodTitle}>Zəhmət olmasa promo kodu daxil edin</Text>
            <KeyboardAvoidingView behavior='position'  style={{ borderBottomWidth: 1}}>
              <CodeInput
                ref="codeInputRef2"
                borderType='circle'
                activeColor='#7C7C7C'
                inactiveColor='#7C7C7C'
                autoFocus={true}
                ignoreCase={true}
                onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
                onCodeChange={(code) => { this.state.code = code }}
                inputPosition='center'
                codeLength={6}
                compareWithCode='123456'
                keyboardType="numeric"
                size={25}
                containerStyle={{ marginTop: 40, marginBottom: 45}}
                codeInputStyle={{ borderWidth: 0, backgroundColor: '#D9D9DA' }}
              />
            </KeyboardAvoidingView>
            <Text style={styles.kodDescription}>Promo kod növbəti sifariş
              zamanı aktiv olacaq</Text>
          </View>
        <View style={styles.btnBox}>
          <MyButton
            text="OK"
            color="#fff"
            backgroundColor="#451E5D"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PromoKodScreen)
