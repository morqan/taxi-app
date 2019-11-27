import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'native-base'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TabAll from '../Components/TabAll'
import TabAll1 from '../Components/TabAll1'
import Tabсosts from '../Components/Tabсosts'
// Styles
import styles from './Styles/GainScreenStyle'
import news from '../Fixtures/news'


class GainScreen extends Component {

  render () {
    return (
      <View style={{flex: 1}} >
          <Container>
            <Tabs tabBarUnderlineStyle={{borderWidth: 0, backgroundColor: '#451E5D', marginTop: 0}}>
              <Tab tabStyle={{backgroundColor: '#451E5D'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#fff', borderBottomColor:'#fff'}} activeTextStyle={{color: '#451E5D', fontWeight: 'bold'}} heading="HAMISI">
                  <TabAll />
              </Tab>
              <Tab tabStyle={{backgroundColor: '#451E5D'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#451E5D', fontWeight: 'bold'}} heading="GƏLİRLƏR">
                <TabAll1 />
              </Tab>
              <Tab tabStyle={{backgroundColor: '#451E5D'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#451E5D', fontWeight: 'bold'}} heading="XƏRCLƏR">
                <Tabсosts />
              </Tab>
            </Tabs>
          </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(GainScreen)
