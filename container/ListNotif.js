 //import liraries
 import React, { Component } from 'react';
 import { View, Text, StyleSheet,Button, TouchableOpacity } from 'react-native';
 
 // create a component
 class ListNotif extends Component {
    constructor(props){
        super(props);
        console.log(props)
    this.state = {
        selected: !props.read,
        }
    }

    static defaultProps = {
        onPress: this.onPress, // on click
    
      }

    onPress = () => {
        this.setState({
            selected: !this.state.selected 
        })
    };

    Style(){
        const viewStyle = this.state.selected ?
        styles.textBold : styles.textNormal;
    }    
 
     renderProducts = (products) => {
        const viewStyle = this.state.selected ?
        styles.textBold : styles.textNormal;
         console.warn(products)
         return products.map((item,index)=>{
             return(
                 <View key={index} style={{padding:5}}>
                     {/* <Button 
                             onPress={() => this.props.onPress(item)} 
                             title={item.title}
                             style={this.viewStyle}/> */}

                              <TouchableOpacity onPress={() => this.props.onPress(item)}>     
                                 <View style={{ width: "100%", height: 70, backgroundColor: '#fff',margin:5,justifyContent: 'center',}}>
                                     <Text style={this.state.selected ? styles.textBold : styles.textNormal }>{item.title}</Text>
                                 </View>
                             </TouchableOpacity>
                </View>
             )
         })
     }
 
     render() { 
         return (
             <View>
                 {this.renderProducts(this.props.products)}
             </View>
         );
     }
 }
 
 //make this component available to the app
 export default ListNotif;
 
 // define your styles
 const styles = StyleSheet.create({
    textBold:{
        fontSize: 16,  textAlign:'center',  color: 'black', fontWeight: 'bold',
    },
    textNormal:{
        fontSize: 16,  textAlign:'center',  color: 'black', fontWeight: 'normal',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
}) 
 
 
 