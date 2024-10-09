import React, { useState, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tạo PhoneContext để chia sẻ dữ liệu giữa các màn hình
const PhoneContext = createContext();

function HomeScreen() {
  const { phoneNumber } = useContext(PhoneContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>Đã đăng nhập với số điện thoại {phoneNumber}</Text>
    </View>
  );
}

function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  );
}

function LoginScreen({ navigation }) {
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const { setPhoneNumber } = useContext(PhoneContext);

  const handleLogin = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(localPhoneNumber)) {
      setPhoneNumber(localPhoneNumber);
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Phone Number', 'Phải nhập đủ 10 số.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        onChangeText={setLocalPhoneNumber}
        value={localPhoneNumber}
      />
      <Button title="Login" onPress={handleLogin} color="#007BFF" />
    </View>
  );
}

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <PhoneContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PhoneContext.Provider>
  );
}

// Các kiểu dáng cho các màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Màu nền nhẹ nhàng
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Màu chữ
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555', // Màu chữ phụ
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%', // Chiếm 80% chiều rộng
    marginTop: 20,
    paddingLeft: 10, // Thêm khoảng cách cho nội dung
    fontSize: 16, // Kích thước chữ
    backgroundColor: '#FFFFFF', // Màu nền cho ô nhập
  },
});

