import * as React from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Switch} from 'react-native';  
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
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
                    <View style={styles.iconWithText}>
                        <Icon name="clock" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Select</Text>
                    </View>
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
        backgroundColor: '#000000', 
        padding: 10, 
        borderRadius: 5,
        alignItems: 'center',
    }, 
    iconWithText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10, 
    },

})