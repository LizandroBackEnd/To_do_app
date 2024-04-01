import * as React from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Switch} from 'react-native';  
import DateTimePicker from '@react-native-community/datetimepicker';

 
export default function AddTodo() {  
    const [name, setName] = React.useState(''); 
    const [date, setDate] = React.useState(new Date()); 
    const [isToday, setIsToday] = React.useState(false); 
    const [showPicker, setShowPicker] = React.useState(false); 
     
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowPicker(false); 
    }; 

    return ( 
        <View style={styles.container}> 
            <Text style={styles.title}>Add Task</Text>  
            <View style={styles.inputContainer}>  
                <Text style={styles.inputTitle}>Name</Text>  
                <TextInput   
                    style={ styles.textInput } 
                    placeholder="Task" 
                    placeholderTextColor="#00000030" 
                    onChangeText={(text) => {setName(text)}}
                />
            </View> 
            <View style={styles.inputContainer}>  
                <Text style={styles.inputTitle}>Hour</Text>  
                 
                <TouchableOpacity style={styles.buttonPicker} onPress={() => setShowPicker(true)}>  
                    <Text style={styles.textPicker}>
                        {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}
                    </Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker   
                        value={date} 
                        mode={'time'} 
                        is24Hour={true} 
                        onChange={onChange} 
                        style={{ width: '80%' }} 
                    />
                )}
            </View> 
            <View style={styles.inputContainer}>  
                <Text style={styles.inputTitle}>Today</Text>  
                <Switch  
                    value={isToday}
                    onValueChange={(value) => {setIsToday(value)}} 
                /> 
            </View>  
            <TouchableOpacity style={styles.button}> 
                <Text style={{ color: '#fff' }}>Done</Text>
            </TouchableOpacity> 
            <Text style={{ color: '#00000060' }}>If you disable today, the task will be considered as tomorrow</Text>
        </View>
    )
} 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor:  'bold', 
        paddingHorizontal: 30,
    }, 
    title: { 
        fontSize: 34, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        marginTop: 10,
    }, 
    inputTitle: { 
        fontSize: 20, 
        fontWeight: '600', 
        lineHeight: 24,
    }, 
    textInput: { 
        borderBottomColor: '#00000030', 
        borderBottomWidth: 1, 
        width: '80%',
    }, 
    inputContainer: { 
        flexDirection: 'row',  
        justifyContent: 'space-between',   
        alignItems: 'center',
        paddingBottom: 30,
    }, 
    button: { 
        marginTop: 30, 
        marginBottom: 15, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#000000',
        height: 46, 
        borderRadius: 11,
    },  
    buttonPicker: { 
        backgroundColor: '#fff', 
        padding: 10, 
        borderRadius: 5,
        alignItems: 'center',
    },  
    textPicker: { 
        fontSize: 15, 
        fontWeight: '500', 
        color:'#737373'
    }

})