import * as React from 'react'; 
import { StyleSheet, Text, View, Image} from 'react-native'; 
import TodoList from '../components/TodoList';

export default function Home() {
  return ( 
    <View style={styles.container}>  
        <Image  
            source={{ uri: 'https://i.pinimg.com/564x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg' }} 
            style={styles.pic} 
        />    
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
  }
});
