import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, ImageBackground, } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 1,
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
    }
  } 

  componentDidMount() {
    this.initializeGame();
  }

  

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  onTilePress = (row,col) => {
    var value=this.state.gameState[row][col];
    if(value!=0){
      return;
    }

    var currentPlayer=this.state.currentPlayer;
    var arr=this.state.gameState.slice();
    arr[row][col]=currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer=(currentPlayer==1)?-1:1;
    this.setState({currentPlayer: nextPlayer});

    //check for winner
    
  }

   renderIcon = (row,col) => {
    var value=this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name="close" style={styles.tileX}/>;
      case -1: return <Icon name="circle-outline" style={styles.tileO}/>;
      default: return <View/>;
    }
    var winner=this.getWinner();
    if(winner==1){
      alert('Player 1 wins');
      this.initializeGame();
    }
    else if(winner==-1){
      alert("Player 2 wins");
      this.initializeGame();
    }
  }

  OnNewGamePress = () => {
    this.initializeGame();
  }

  getWinner = () => {
    var sum;
    var arr=this.state.gameState;
    const NUM_TILES=3;

    //check for rows
    for(var i=0;i<NUM_TILES;i++){
      sum=arr[i][0]+arr[i][1]+arr[i][2];
      if(sum==3) {return 1;}
      else if(sum==-3) {return -1;}
    }
    //check for columns
    for(var i=0;i<NUM_TILES;i++){
      sum=arr[0][i]+arr[1][i]+arr[2][i];
      if(sum==3) {return 1;}
      else if(sum==-3) {return -1;}
    }

    sum=arr[0][0]+arr[1][1]+arr[2][2];
    if(sum==3) {return 1;}
    else if(sum==-3) {return -1;}

    sum=arr[0][2]+arr[1][1]+arr[2][0];
    if(sum==3) {return 1;}
    else if(sum==-3) {return -1;}

    return 0;
  } 

  render() {
    return(
      <View style={styles.container}>
        <ImageBackground source={require('./backgroundimage1.jpg')} style={styles.backgroundImage}>
        <View style={styles.box}>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style = {[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
           {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style = {[styles.tile, {borderTopWidth: 0}]}>
           {this.renderIcon(0,1)} 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style = {[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
          {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style = {[styles.tile, {borderLeftWidth: 0}]}>
          {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style = {styles.tile}>
          {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style = {[styles.tile, {borderRightWidth: 0}]}>
          {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style = {[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
          {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style = {[styles.tile, {borderBottomWidth: 0}]}>
          {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style = {[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
          {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={{padding: 10}}/>
        <Button title="New Game" onPress={this.OnNewGamePress}/>
        </View>
        </ImageBackground>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    //marginTop: 100,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    //height: null,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100, 
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    fontSize: 60,
    color: "red",
  },
  tileO: {
    fontSize: 60,
    color: "green",
  },
});