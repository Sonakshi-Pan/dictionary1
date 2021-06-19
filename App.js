
import { StyleSheet,View,Text,TextInput,TouchableOpacity } from 'react-native';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { render } from 'react-dom';

export default class App extends Component{
  constructor(){
    super();
    this.state={
      text:'',
      isSearchPressed:false,
      isLoading:false,
      word:"Loading...",
      lexicalCategory:'',
      definition:''
    }
    }
    getWord=(word)=>{
      var searchKeyword=word.toLowerCase()
      var url="https://rupinwhitehatjr.github.io/dictionary/"+ searchKeyword+"json"
      return fetch(url)
      .then((data)=>{
        if(data.status===200){
          return data.json()
      
        }
        else
        {
          return null
      }
      
      })
      .then((response)=>{
      var responseObject = response
   
      if(responseObject){
        var wordData=responseObject.definitions[0]
        var definitions =wordData.description
        var lexicalCategory = wordData.wordtype
        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCategory":lexicalCategory
        })
      }
      else{
        this.setState({
          "word":this.state.text,
          "definition":"Not Found"
        })
      }
    })

  }
render(){
  return(
    <View style = {{flex:1,borderWidth:2}}>
      <Header backgroundColor={'purple'}
      centerComponent ={{text:'pocket dictionary',style:{color:'#fff',fontSize:20}}}/>
    <View>
      <TextInput style={styles.inputBox}
      onChangeText={(text)=>({
         text:text,
        isSearchPressed: false,
        word:'loading....',
        lexicalCategory:'',
        examples:[],
        definition:""
      })}
      value={this.state.text}
      />
      <TouchableOpacity>
        style={style.searchButton}
        onPress={()=>{
          this.setState({isSearchPressed:true});
          this.getWord(this.state.text)
        }}
        <Text style={styles.outputCointainer}>{
          this.state.isSearchPressed && this.state.word ==="loading.."
          ? this.state.word
          : ""
        }
        
          </Text>{
            this.state.word !=="Loading..." 
            (
              <View style={{justifyContent:"center",marginLeft:10}}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}>
                    Word:{" "}
                  </Text>
                   </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>
                  Type:{" "}
                </Text>
                <Text style={{fontSize:18}}>
                  {this.state.lexicalCategory}
                </Text>
                <View>
                <Text style={{flexDirection:'row',flexwrap:'wrap'}}>
                  Definition:{" "}
                </Text>
                <Text>
                  {this.state.definition}
                </Text>
                </View>    

              </View>
              </View>
            )
        
        }
        </TouchableOpacity> 



    </View>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  inputBoxContainer:{
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox:{
    width:'80%',
    alignSelf:"center",
    height:40,
    textAlign:'center',
    borderWidth:4
  },
  searchButton:{
    width:'40',
    justifyContent:'center',
    alignItems:"center",
    height:40,
    textAlign:'center',
    borderWidth:2,
    margin:10,
    borderRadius:10
  },
  searchText:{
    fontSize:20,
    fontWeight:'bold'
  },
  outputCointainer:{
    flex:0.7,
    alignItems:"center"
  },
  detailsContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  detailsTitle:{
    color:"orange",
    fontSize:20,
    fontWeaight:"bold"
  }
});
