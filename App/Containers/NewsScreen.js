import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, Image, FlatList, View,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import news from '../Fixtures/news'
import { Container, Content, Text, } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NewsScreenStyle'





// const DATA = [
//   {
//     id: '1',
//     picture: Images.ekonomCarIcon,
//     startPlace: 'Qara Qarayev 56',
//     endPlace: 'Süleyman Rəhimov 3/12',
//     price: '5 AZn',
//     type: 'Ekonom',
//     date: '21.09.19'
//   },
//   {
//     id: '2',
//     picture: Images.ekonomCarIcon,
//     startPlace: 'Süleyman Rəhimov 3/12',
//     endPlace: 'Qara Qarayev 56',
//     price: '6 AZn',
//     type: 'Ekonom',
//     date: '21.09.21'
//   },
//   {
//     id: '3',
//     picture: Images.ekonomCarIcon,
//     startPlace: 'Qara Qarayev 56',
//     endPlace: 'Telnov 10',
//     price: '7 AZn',
//     type: 'Ekonom',
//     date: '21.09.25'
//   }
// ];

class NewsScreen extends Component {

  renderNewsItem = ({item, index}) => {
    return (
     <TouchableOpacity style={[styles.newsItemContainer, {backgroundColor: index % 2 === 1 ? '#fafafa' : ''}]}>
         <Image style={styles.newsImage} source={item.picture} />
         <View style={styles.newsTextBox}>
           <Text style={styles.newsText}  numberOfLines={3} ellipsizeMode='tail' >{item.text}</Text>
           <Text style={styles.newsDate}>{item.date}</Text>
         </View>
     </TouchableOpacity>
    )
  };


  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Container>
            <Content>
              <FlatList
                renderItem={this.renderNewsItem}
                keyExtractor={(item) => item.id}
                data={news} />
            </Content>
          </Container>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen)
