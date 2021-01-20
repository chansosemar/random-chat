import React, {useState, useEffect} from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const hp = Dimensions.get('window').height;
const wp = Dimensions.get('window').width;

const Home = () => {
	const [roomName, setRoomName] = useState();
	const [status, setStatus] = useState();
	const navigation = useNavigation();

	const submit = () => {
		if (roomName != null) {
			navigation.navigate('Chat', {roomName});
		} else {
			setStatus('ROOM ID !!');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}>
			{status == 'ROOM ID !!' ? (
				<Text style={styles.warning}>{status}</Text>
			) : null}
			<Text style={styles.title}>Random Chat</Text>
			<TextInput
				style={styles.formInput}
				keyboardType="numeric"
				value={roomName}
				placeholder="Input Room ID"
				onChangeText={(text) => {
					setStatus(''), setRoomName(text);
				}}
			/>
			<TouchableOpacity style={styles.btn} onPress={() => submit()}>
				<Text style={styles.txt}>JOIN</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignSelf: 'center',
		justifyContent: 'center',
		width: wp * 0.8,
		height: hp,
	},
	formInput: {
		borderWidth: 1,
		borderColor: '#222',
		borderRadius: 20,
		paddingHorizontal: 20,
	},
	btn: {
		padding: 20,
		marginVertical: 20,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
		width: wp * 0.3,
		borderRadius: 20,
	},
	txt: {
		color: '#fff',
		fontWeight: 'bold',
	},
	title: {
		fontSize: 20,
		color: '#222',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginVertical: 20,
	},
	warning: {
		fontSize: 20,
		color: '#d72222',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginVertical: 20,
	},
});
//
//
// const [chat, setChat] = useState('');
// 	const [chats, setChats] = useState([]);
//
// 	useEffect(() => {
// 		const socket = io(ENDPOINT);
// 		socket.on('chat message', (msg) => {
// 			setChats([...chats, msg]);
// 		});
// 	}, []);
//
// 	const submitChat = () => {
// 		const socket = io(ENDPOINT);
// 		socket.emit('chat message', chat);
// 		setChat('')
// 	}
