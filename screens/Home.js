import * as React from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform} from 'react-native'; 
import TodoList from '../components/TodoList'; 
import { todosData } from '../data/todos'; 
import { useNavigation } from '@react-navigation/native'; 
import { useSelector, UseDispatch, useDispatch } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { hideCompletedReducer, setTodosReducer } from '../redux/todosSlice'; 
import * as Notifications from 'expo-notifications'; 
import * as Device from 'expo-device'; 
import moment from 'moment'; 
 
Notifications.setNotificationHandler({ 
  handleNotification: async () => ({ 
    shouldShowAlert: true, 
    shouldPlaySound: true, 
    shouldSetBadge: true,
  })
})

export default function Home() { 
   
    const todos = useSelector(state => state.todos.todos);
    //const [localData, setLocalData] = React.useState(  
    //  todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
    //); 
    const [isHiden, setIsHiden] = React.useState(false); 
    const [expoPushToken, setExpoPushToken] = React.useState('');  
    const navigation = useNavigation(); 
    const dispatch = useDispatch();
     
    React.useEffect(() => {  
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      const getTodos = async () => { 
        try { 
          const todos = await AsyncStorage.getItem("@Todos"); 
          if(todos !== null) {  
            const todosData = JSON.parse(todos); 
            const todosDataFiltered = todosData.filter(todo => { 
              return moment(new Date(todo.hour)).isSameOrAfter(moment(), 'day');
            }) 
            if(todosDataFiltered !== null) { 
              await AsyncStorage.setItem("@Todos", JSON.stringify(todosDataFiltered)); 
              console.log('We delete some passed todos'); 
              dispatch(setTodosReducer(todosDataFiltered)); 
            }
            
          }
        } catch(e) { 
          console.log(e);
        }
      } 
      getTodos();
    }, []); 
     
    const handleHidePress = async () => { 
      if(isHiden) { 
        setIsHiden(false); 
        const todos = await AsyncStorage.getItem("@Todos"); 
        if(todos !== null) { 
          dispatch(setTodosReducer(JSON.parse(todos)));
        } 
        return;
      } 
       
      setIsHiden(true); 
      dispatch(hideCompletedReducer());
    }  
     
    const registerForPushNotificationsAsync = async () => { 
      let token; 
      if(Device.isDevice) { 
        const { status: existingStatus } = await Notifications.getPermissionsAsync(); 
        let finalStatus = existingStatus; 
        if(existingStatus !== 'granted') { 
          const { status } = await Notifications.requestPermissionsAsync(); 
          finalStatus = status;
        } 
        if(finalStatus !== 'granted') { 
          alert('Failed to get push token for push notification!');
          return;
        } 
        token = (await Notifications.getExpoPushTokenAsync()).data; 
        console.log(token);
      } else {return;} 
      if(Platform.OS === 'android') { 
        Notifications.setNotificationChannelAsync('default', { 
          name: 'default', 
          importance: Notifications.AndroidImportance.MAX, 
          vibrationPattern: [0, 250, 250, 250], 
          lightColor: '#FF231F7C',
        });
      } 
      return token;
    }
     
    

    return (
      todos.length > 0 ? (
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
          {todos.filter(todo => moment(new Date(todo.hour)).isSame(moment(), 'day')).length > 0 ? (
            <TodoList todosData={todos.filter(todo => moment(new Date(todo.hour)).isSame(moment(), 'day'))} />
          ) : ( 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dqdmwsoan/image/upload/v1717630679/qpaogdknezckgpirs1fo.png' }}

                style={{ width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>CONGRATS!</Text>
              <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>You don't have any task for today, enjoy your day.</Text>
            </View>
            // Aquí puedes poner el código para mostrar cuando no hay tareas para hoy
          )}
          <Text style={styles.title}>Tomorrow</Text>
          {todos.filter(todo => moment(new Date(todo.hour)).isAfter(moment(), 'day')).length > 0 ? (
            <TodoList todosData={todos.filter(todo => moment(new Date(todo.hour)).isAfter(moment(), 'day'))} />
          ) : ( 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dqdmwsoan/image/upload/v1717630679/iihm1gtjfubznech0wt9.png'}}

                style={{ width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>CONGRATS!</Text>
              <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>You don't have any task for today, enjoy your day.</Text>
            </View>
            // Aquí puedes poner el código para mostrar cuando no hay tareas para mañana
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.button}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg' }}
            style={styles.pic}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}> 
          <Image
                source={{  uri: 'https://res.cloudinary.com/dqdmwsoan/image/upload/v1717630679/o6t545057w7wnt7kywec.png' }}
                style={{ width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' }}
              />
            <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>NICE!</Text>
            <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>Nothing is scheduled.</Text>
          </View> 
          <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.button}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      )
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
