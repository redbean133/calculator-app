import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [expression, setExpression] = useState('');
  const [displayExpress, setdisplayExpress] = useState('');
  const [historyExpress, setHistoryExpress] = useState('');

  const buttons = ['C', 'DEL', '%', '/', 
                    7, 8, 9, '*', 
                    4, 5, 6, '-', 
                    1, 2, 3, '+', 
                    0, '.', '='
                  ];

  // Hàm tính toán biểu thức
  function calculator() {
    let lastCharacter = expression[expression.length - 1];
    if (lastCharacter === '/' || lastCharacter === '*' || lastCharacter === '-' || lastCharacter === '+' || lastCharacter === '.') {
      setExpression(expression);
      return;
    } else {
      let result = eval(expression.replace(/%/g, '/100')).toString();
      setExpression(result);
      setHistoryExpress(expression + '=');
      return;
    }
  }

  // Hàm xử lý sự kiện
  function handleInput(buttonPressed) {
    switch(buttonPressed) {
      case 'DEL':
        setExpression(expression.substring(0, (expression.length - 1)));
        break;
      case 'C':
        // Vibration được sử dụng để điều khiển rung của thiết bị, cường độ rung mặc định là 400ms
        Vibration.vibrate(50);
        setHistoryExpress('');
        setExpression('');
        break;
      case '=':
        Vibration.vibrate(50);
        calculator();
        break;
      default:
        let lastCharacter = expression[expression.length - 1];
        if ("+-*/.".indexOf(lastCharacter) > -1 && "+-*/%.".indexOf(buttonPressed) > -1) {
          setExpression(expression.substring(0, (expression.length - 1)) + buttonPressed);
          break;
        }
        setExpression(expression + buttonPressed);
    }
  }

  const styles = StyleSheet.create({
    results: {
      maxWidth: '100%',
      minHeight: '35%',
      paddingRight: '5%',
      backgroundColor: darkMode ? '#141E27' : '#f5f5f5',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      margin: 15,
      fontSize: 35,
      color: '#00b9d6',
    },
    historyText: {
      marginRight: 10,
      fontSize: 20,
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      alignSelf: 'flex-end',
    },
    darkLightButton: {
      bottom: '3%',
      left: '3%',
      width: 50,
      height: 50,
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      borderRadius: 25,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      width: '100%',
      height: '65%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: darkMode ? '#141E27' : '#f5f5f5',
    },
    button: {
      minWidth: '20%',
      minHeight: '15%',
      margin: '1%',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
      fontSize: 28,
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
    }
  })

  return(
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.darkLightButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{historyExpress}</Text>
        <Text style={styles.resultText}>{expression}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' || button === '%' || button === 'C' || button === 'DEL'?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#39AEA9'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'Character' ? darkMode ? '#203239' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '41%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'Character' ? darkMode ? '#203239' : '#fff' : darkMode === true ? '#414853' : '#ededed' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}