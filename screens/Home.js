import * as React from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'; 
import TodoList from '../components/TodoList'; 
import { todosData } from '../data/todos'; 
import { useNavigation } from '@react-navigation/native'; 
import { useSelector, UseDispatch, useDispatch } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { hideCompletedReducer, setTodosReducer } from '../redux/todosSlice';

export default function Home() { 
   
    const todos = useSelector(state => state.todos.todos);
    //const [localData, setLocalData] = React.useState(  
    //  todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
    //); 
    const [isHiden, setIsHiden] = React.useState(false);  
    const navigation = useNavigation(); 
    const dispatch = useDispatch();
     
    React.useEffect(() => { 
      const getTodos = async () => { 
        try { 
          const todos = await AsyncStorage.getItem("@Todos"); 
          if(todos !== null) { 
            dispatch(setTodosReducer(JSON.parse(todos)));
          }
        } catch(e) { 
          console.log(e);
        }
      } 
      getTodos();
    }, []);
     
    const handleHidePress = () => { 
        //if ( isHiden) { 
         //   setIsHiden(false) 
          //  setLocalData(todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})) 
          //  return;
        //} 
        //setIsHiden(!isHiden) 
        //setLocalData(localData.filter(todo => !todo.isCompleted))
    } 

  return ( 
    <View style={styles.container}>  
        <Image  
            source={{ uri: 'https://i.pinimg.com/564x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg' }} 
            style={styles.pic} 
        />    
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> 
            <Text style={styles.title}>Today</Text>  
            <TouchableOpacity onPress={handleHidePress}>  
            <Text style={{ color: '#3478f6' }}>{isHiden ? "Show Completed" : "Hide Completed"}</Text>     
            </TouchableOpacity> 
        </View>
        <TodoList todosData={todos.filter(todo => todo.isToday)} />
        <Text style={styles.title}>Tomorrow</Text>  
        <TodoList todosData={todos.filter(todo => !todo.isToday)} />
        <TodoList /> 
         
        <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.button}>   
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 70, 
    paddingHorizontal: 15
  }, 
  pic: { 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    alignSelf: 'flex-end'
  }, 
  title: { 
    fontSize: 34,
    fontWeight: 'bold', 
    marginBottom: 35, 
    marginTop: 10,
  }, 
  button: { 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    backgroundColor: '#000', 
    position: 'absolute', 
    bottom: 50, 
    right: 20, 
    shadowColor: '#000', 
    shadowOffset: { 
        width: 0, 
        height: 2
    }, 
    shadowOpacity: .5, 
    shadowRadius: .5, 
    elevation: 5,
  }, 
  plus: { 
    fontSize: 40, 
    color: '#fff', 
    position: 'absolute', 
    top: -8, 
    left: 10
  }
});
