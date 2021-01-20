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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {hp, wp, fp} from '../../responsive';

const Home = () => {
	const [roomName, setRoomName] = useState();
	const [status, setStatus] = useState();
	const navigation = useNavigation();

	const submit = () => {
		if (roomName != null && roomName.length >= 4) {
			navigation.navigate('Chat', {roomName});
		} else {
			setStatus('4 DIGIT ROOM ID !!');
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			{status == '4 DIGIT ROOM ID !!' ? (
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
		padding: hp(2),
		alignSelf: 'center',
		justifyContent: 'center',
		width: wp(80),
		height: hp(100),
	},
	formInput: {
		borderWidth: 1,
		borderColor: '#222',
		borderRadius: 20,
		paddingHorizontal: wp(5),
	},
	btn: {
		padding: hp(2.5),
		marginVertical: hp(2.5),
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
		width: wp(30),
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
		marginVertical: hp(2.5),
	},
	warning: {
		fontSize: 20,
		color: '#d72222',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginVertical: hp(2.5),
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
