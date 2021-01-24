import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';

export default class SearchScreen extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      allTransaction:[],
      lastTransaction:null,
      search:"",
      
    }
  }
  fetchMoreTransaction = async()=>{
    var text = this.state.search.toUpperCase();
    var enterText = text.split("");
    if (enterText[0].toUpperCase() === 'B')
      {
        
        const query = await db.collection("transaction").
        where("bookId","==",text).
        startAfter(this.state.allTransaction).limit(10).get();
        query.docs.map((doc)=>{
          this.setState({
            allTransaction:[...this.state.allTransaction,doc.data()],
            lastTransaction:doc,
          })
    
        })
      }
      if (enterText[0].toUpperCase() === 'S')
      {
        
        const query = await db.collection("transaction").
        where("studentId","==",text).
        startAfter(this.state.allTransaction).limit(10).get();
        query.docs.map((doc)=>{
          this.setState({
            allTransaction:[...this.state.allTransaction,doc.data()],
            lastTransaction:doc,
          })
    
        })
      }
    
  }

    render(){
      return(
        <View style = {styles.container}>
          <View style = {styles.searchView}>
            <TextInput 
            style = {styles.searchBar}
            placeholder = "Enter bookID or studentID"
            onChangeText = {(Text)=>{
              this.setState({
                search:Text
              })
            }} 
            ></TextInput>
            <TouchableOpacity style = {styles.searchButton}

            onPress = {()=>{
              this.searchTransaction(this.state.search)
            }}
            
            ></TouchableOpacity>
          </View>
        <FlatList data = {this.state.allTransaction}
        renderItem = {({item})=>(
          <View style = {{borderBottomWidth:2}} >
          <Text>{"bookId:" + item.bookId}</Text>
          <Text>{"studentId:" + item.studentId}</Text>
          <Text>{"date:" + item.date.toDate()}</Text>
          <Text>{"transactionType:" + item.transactionType}</Text>
        </View>
        )}
        keyExtractor = {(item,index)=>index.toString()}
        onEndReached = {this.fetchMoreTransaction}
        onEndReachedThreshold = {0.7}>
       
        </FlatList>
        </View>
      
      )
    }

    searchTransaction = async(searchText)=>{
      var enterText = searchText.split("");
      var text = searchText.toUpperCase();
      
      if (enterText[0].toUpperCase() === 'B')
      {
        console.log(text + enterText);
        const transaction = await db.collection("transaction").
        where("bookId","==",text).get();
        
        transaction.docs.map((doc)=>{
          this.setState({
            allTransaction:[...this.state.allTransaction,doc.data()],
          lastTransaction:doc

          })
        })
      }
      if (enterText[0].toUpperCase() === 'S')
      {
        const transaction = await db.collection("transaction").
        where("studentId","==",text).get();
        transaction.docs.map((doc)=>{
          this.setState({
            allTransaction:[...this.state.allTransaction,doc.data()],
          lastTransaction:doc

          })
        })
      }
    }

    componentDidMount = async()=>{
    const query = await db.collection("transaction").get();
    query.docs.map((doc)=>{
      this.setState({
        allTransaction:[],
        lastTransaction:doc,
      })
    })
  console.log(this.state.allTransaction);
  }

}

const styles = StyleSheet.create({
  container : {
    flex:1,
    marginTop:20,
  },
  searchView:{
    flexDirection:"row",
    height:40,
    width:"auto",
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:"orange",
  },
  searchBar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:"red",
  }
})
