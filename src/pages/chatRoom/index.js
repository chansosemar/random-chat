import React, {useState, useEffect, useRef} from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import io from 'socket.io-client';
import {hp, wp, fp} from '../../responsive';

const ChatRoom = (props) => {
	const roomId = props.route.params.roomName;
	const [newMessage, setNewMessage] = useState('');
	const socketRef = useRef();
	const [messages, setMessages] = useState([]);
	const ENDPOINT = 'https://randomchat-chanso.herokuapp.com/';

	useEffect(() => {
		socketRef.current = io(ENDPOINT, {
			query: {roomId},
		});

		socketRef.current.on('chat message', (message) => {
			const incomingMessage = {
				...message,
				ownedByCurrentUser: message.senderId === socketRef.current.id,
			};
			setMessages((message) => [...messages, incomingMessage]);
		});
		return () => {
			socketRef.current.disconnect();
		};
	}, [roomId]);

	const sendMessage = (messageBody) => {
		socketRef.current.emit('chat message', {
			body: messageBody,
			senderId: socketRef.current.id,
		});
		const sendingMessage = {
			...messageBody,
			ownedByCurrentUser: messages.senderId === socketRef.current.id,
		};
		setMessages((messageBody) => [...messages, sendingMessage]);
	};

	const handleNewMessage = (e) => {
		setNewMessage(e);
	};

	const handleSendMessage = () => {
		sendMessage(newMessage);
		setNewMessage('');
	};

	return (
		<>
			<Text style={styles.title}>Room: {roomId}</Text>
			<View style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={-500}
					behavior="padding"
					style={styles.keyboardAvoid}>
					<ScrollView style={{flex: 1}}>
						{messages
							? messages.map((message, i) => (
									<Text
										style={
											message.ownedByCurrentUser == true
												? styles.msgUser
												: styles.msgClient
										}
										key={i}>
										{message.body}
									</Text>
							  ))
							: null}
					</ScrollView>
					<View>
						<TouchableOpacity onPress={handleSendMessage} style={styles.send}>
							<Text style={styles.txt}>Send</Text>
						</TouchableOpacity>
						<TextInput
							value={newMessage}
							onChangeText={handleNewMessage}
							placeholder="Write Message..."
							style={styles.formInput}
							multiline={true}
							numberOfLines={2}
						/>
					</View>
				</KeyboardAvoidingView>
			</View>
		</>
	);
};

export default ChatRoom;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
	},
	title: {
		fontSize: 20,
		color: '#222',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginVertical: 20,
	},
	formInput: {
		borderWidth: 1,
		borderColor: '#222',
		borderRadius: 20,
		paddingHorizontal: 20,
		width: wp(90),
	},
	keyboardAvoid: {
		flex: 1,
	},
	msgUser: {
		backgroundColor: 'green',
		color: '#fff',
		fontSize: 18,
		padding: 15,
		marginVertical: 5,
		borderRadius: 10,
		textAlign: 'right',
	},
	msgClient: {
		backgroundColor: 'blue',
		color: '#fff',
		fontSize: 18,
		padding: 15,
		marginVertical: 5,
		borderRadius: 10,
		textAlign: 'left',
	},
	send: {
		position: 'absolute',
		alignSelf:'flex-end',
		zIndex:1,
		top:hp(1),
		right:wp(5),
		padding:10,
	},
	txt:{
		color: '#222',
		fontSize:18,
	}
});
