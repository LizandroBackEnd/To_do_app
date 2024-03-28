import * as React from 'react'; 
import { StyleSheet, Text, View, Image} from 'react-native'; 
import TodoList from '../components/TodoList'; 
import { todosData } from '../data/todos';

export default function Home() {
  return ( 
    <View style={styles.container}>  
        <Image  
            source={{ uri: 'https://i.pinimg.com/564x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg' }} 
            style={styles.pic} 
        />    
        <Text style={styles.title}>Today</Text>  
        <TodoList todosData={todosData.filter(todo => todo.isToday)} />
        <Text style={styles.title}>Tomorrow</Text>  
        <TodoList todosData={todosData.filter(todo => !todo.isToday)} />
        <TodoList />
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
  }
});
