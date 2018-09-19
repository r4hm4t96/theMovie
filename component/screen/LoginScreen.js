import React, { Component } from 'react';
import { View, Text,TextInput,Image,TouchableOpacity,AsyncStorage,Alert,ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeScreen from './HomeScreen';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
            username: null,
            password: null,
           
    };
    this.inputFile = {};
    
  console.log(this.props)
  }
  
  handleBackButton = () => {
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   } 
   
   componentWillUnmount() {
    //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }

  componentDidMount = ()=>{
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  //   AsyncStorage.getItem("accessToken").then((v)=>{
  //     if(v!=undefined){
  //         this.setState({token_storage: v});
  //         setInitialRoute('Home',this.props);
  //     };
  //   });
  }

  handleHome = ()=>{
    this.props.navigation.navigate('Home')
  }

  handleUserName = (text) => {
    this.setState({ username: text })
  };

  handlePassword = (text) => {
      this.setState({ password: text })
  };

  focusNext(id) {
      this
          .inputFile[id]
          .focus();
  };
         
        SomethisReing = () => {
          if(this.state.username == null || this.state.password == null || this.state.username.trim() == "" || this.state.password.trim() == ""){
              Alert.alert("Error", "Please fill a valid username and password!");
          }else if(this.state.username == "admin" && this.state.password == "admin" || this.state.username.trim() == "ADMIN" && this.state.password.trim() == "ADMIN"){
              Alert.alert("Success","Login Success")
              this.props.navigation.navigate('Home')
          }else {
              Alert.alert("Error","Username and Password error")
          }
          
      };

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#364854',paddingLeft:60,paddingRight:60,}}>
        <ScrollView>
        <View style={{alignSelf: 'center',paddingTop:90}}>
          <Image source={require('../images/LogoMovie.png')} style={{alignItems: 'center', height:200,width:200}}/>
        </View>
        <View style={{flexDirection:'row',marginTop:20}}>
          <Icon name='user' size={32} style={{alignSelf: 'center',marginTop:15}}/>
          <TextInput
              style={{borderBottomWidth:1,borderBottomColor:'#fff',width:230,marginTop:10,marginLeft:5,color:'#fff'}} 
              underlineColorAndroid='transparent'
              placeholder='Username'
              blurOnSubmit={false}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.focusNext('password')
              }}
              ref={input => {
                this.inputFile['username'] = input;
              }}
              onChangeText={this.handleUserName}
              
              />
        </View>
        <View style={{flexDirection:'row',marginTop:20}}>
          <Icon name='lock' size={32} style={{alignSelf: 'center',marginTop:15}}/>
          <TextInput
              style={{borderBottomWidth:1,borderBottomColor:'#fff',width:230,marginTop:10,marginLeft:5,color:'#fff'}}
              underlineColorAndroid='transparent'
              placeholder='Password'
              secureTextEntry={true}
              blurOnSubmit={true}
              returnKeyType={"done"}
              ref={input => {
                this.inputFile['password'] = input;
              }}
              onSubmitEditing={() => {
                this.SomethisReing()
            }}
              onChangeText={this.handlePassword} 
              />
        </View>

        <View>
          <TouchableOpacity onPress={this.SomethisReing} style={{borderRadius:20,width:130,height:40,backgroundColor:'#59cbbd',marginTop:50,alignSelf:'center',justifyContent:'center',}}>
            <Text style={{fontSize: 20,color:'#fff',alignSelf:'center',justifyContent:'center'}}>Login</Text>
          </TouchableOpacity> 
        </View>
        </ScrollView>
      </View>
    );
  }
}
