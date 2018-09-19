import React, { Component } from 'react';
import { View, Text,Dimensions,Image,TouchableOpacity,ScrollView } from 'react-native';
import ElevatedView from 'react-native-elevated-view' 
import Icon from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import _ from 'lodash';

const WINDOW = Dimensions.get('window');

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BadgeCount:0,
      movie: props.navigation.state.params ? this.props.navigation.state.params : {}
    };
  }

  handleNotif = () => {
    this.props.navigation.navigate('Notifications')
  }

  handleFavorite = ()=>{
    this.props.navigation.navigate('Favorite')
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#364854'}}>
        <View style={{backgroundColor:'steelblue',width:"100%", height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{width:50}}/>
          <Image source={require('../images/splashMovie.png')} style={{alignSelf:'center',width:100,height:80,resizeMode:'contain',}}/>
            <TouchableOpacity onPress={this.handleNotif}>
              <IconBadge
                  MainElement={
                      <View style={{width:35,height:50,justifyContent: 'center',}}>
                        <Icon name='bell' size={28} style={{marginRight:10,color:'#fff'}}/>
                      </View>    
                  }
                  BadgeElement={
                      <Text style={{color:'#FFFFFF'}}>{this.props.unreadNotifications.length.toString()}</Text>
                  }
                  Hidden={this.state.BadgeCount==0}/>
          </TouchableOpacity>
        </View>
      
        <View style={{flex:1,width:"90%", flexDirection:'row',padding:5,}}>
          <ElevatedView elevation={2} style={{marginLeft:5,marginTop:5,marginRight:5, width:WINDOW.width * 0.5,height:WINDOW.height* 0.5}}>
            <Image source={{uri:this.state.movie.image}} style={{ width:WINDOW.width * 0.5,height:WINDOW.height* 0.5,resizeMode:'stretch'}}/>
          </ElevatedView>
            <View style={{flexDirection:'column'}}>
              <ElevatedView style={{width:WINDOW.width * 0.4,height:100,margin:5,alignItems: 'center',justifyContent:'center',backgroundColor:'#bfd0e6',borderRadius:10}}>
                <Text style={{textAlign:'center',fontSize:24,color:'#000',justifyContent: 'center',}}>{ this.state.movie.judul }</Text>
              </ElevatedView>
              <ElevatedView elevation={2} style={{width:WINDOW.width * 0.4,height:WINDOW.height * 0.6,margin:5,backgroundColor:'#bfd0e6',borderRadius:10}}>
                <Text style={{textAlign:'center'}}>Synopsis: </Text>
                <Text style={{textAlign:'center'}}>{this.state.movie.sinopsis}</Text>
              </ElevatedView>
            </View>
        </View>

        <View style={{flex:1,padding:5,}}>
          <ElevatedView style={{width:WINDOW.width * 0.5,marginTop:40,marginLeft:5 ,height:30,justifyContent: 'center',backgroundColor:'transparent'}}>
            <Text style={{fontSize:18,textAlign:'center',color:'#ffdf00'}}>{this.state.movie.rating}</Text>
          </ElevatedView>
          <TouchableOpacity onPress={this.handleFavorite} style={{borderRadius:20,width:WINDOW.width * 0.5,marginTop:5,marginLeft:5 ,height:40,justifyContent: 'center',backgroundColor:'#ff6e00'}}>
            <Text style={{fontSize:18,textAlign:'center'}}>Add Favorite</Text>
          </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <ElevatedView elevation={3} style={{height:155,width:WINDOW.width * 0.5,marginLeft:5,marginTop:5,borderRadius:20}}>
                <Text style={{textAlign:'center'}}>Pemeran:</Text>
                <Text style={{textAlign:'center',margin:3}}>{this.state.movie.pemeran}</Text>
              </ElevatedView>
              <ElevatedView elevation={2} style={{height:60,width:WINDOW.width * 0.4,marginLeft:10,marginTop:100,borderRadius:20}}>
                <Text style={{textAlign:'center'}}>JAM TAYANG</Text>
                <Text style={{textAlign:'center',marginTop:5}}>{this.state.movie.jam_tayang}</Text>
              </ElevatedView>
            </View>
          </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  // console.log(state);
  // console.log(props);
  return {
      unreadNotifications: _.filter(state.notification, notification => notification.read != null && notification.read == false)
  }
}

function mapDispatchToProps(dispatch, props) {
  // return bindActionCreators(Actions, dispatch);
  return {
      // getNotification: () => Actions.getNotification(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);