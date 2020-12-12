import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: ''
    }
  }

  getWord=(word)=>{
    var searchKeyWord = word.toLowerCase();
    var url = 'https://rupinwhitehatjr.github.io/dictionary/'+ searchKeyWord +'.json';
    return fetch(url).then((data)=>{
      if(data.status === 200){
        return data.json();
      }else{
        return null
      }
    })
    .then((response)=>{

      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype;
        this.setState({
          word : this.state.text,
          definition: definition,
          lexicalCategory: lexicalCategory
        })
      }else{
        this.setState({
          word: this.state.text,
          definition: 'Not Found',
        })
      }
    })
  }

  render(){
    return (
      <View>
        <Header
           backgroundColor = {"#8900ff"}
           centerComponent = {{ text: "Dictionary App", style: {color: "#fff", fontSize: 20, fontWeight: 'bold' }}}
        />
        <TextInput
        style = {styles.inputBox}
          onChangeText = {(text)=>{
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: 'Loading...',
              examples: [],
              definition: 'Loading...'
            })
          }}
          value = {this.state.text}
        />
        <TouchableOpacity
          style = {styles.searchButton}
          onPress = {()=>{
            this.setState({
              isSearchPressed: true,
            })
            this.getWord(this.state.text);
          }}
        >
          <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Word: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.word}</Text>
        </View>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Type: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.lexicalCategory}</Text>
        </View>

        <View style = {styles.container}>
          <Text style = {styles.mainText}>Definition: {''}</Text>
          <Text style = {styles.resultantText}>{this.state.definition}</Text>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  mainText: {
    marginLeft: 10,
    fontSize: 20,
    color: "orange",
    fontWeight: "bold"
  },
  resultantText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 2
  },
  inputBox: {
    width: '80%',
    height: 40,
    alignSelf: "center",
    textAlign: "center",
    borderWidth: 4,
    marginTop: 80,
    outline: "none"
  },
  searchButton: {
    width: '50%',
    height: 55,
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
