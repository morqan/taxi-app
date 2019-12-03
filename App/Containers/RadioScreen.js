import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RadioScreenStyle'
import MyRadio from '../Components/MyRadio'
import { Images } from '../Themes'
class RadioScreen extends Component {
  state = {
    phone: null,
    radioItems:
      [
        {
          label: 'Piyada',
          size: 30,
          color: '#1f1f1f',
          selected: false,
          image: Images.walker

        },

        {
          label: 'Motosiklet',
          color: '#1f1f1f',
          size: 30,
          selected: true,
          image: Images.bike
        },
        {
          label: 'Avtomobil',
          size: 30,
          color: '#1f1f1f',
          selected: false,
          image: Images.car
        }

      ],
    selectedItem: ''
  }
  componentDidMount() {
    this.state.radioItems.map((item) => {
      if (item.selected == true) {
        this.setState({ selectedItem: item.label });
      }
    });
  }

  changeActiveRadioButton(index) {
    this.state.radioItems.map((item) => {
      item.selected = false;
    });

    this.state.radioItems[index].selected = true;

    this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].label });
    });
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.radioBox}>
          {
            this.state.radioItems.map((item, key) =>
              (
                <MyRadio key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
              ))
          }
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RadioScreen)
