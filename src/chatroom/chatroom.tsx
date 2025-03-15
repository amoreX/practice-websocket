import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:4001");

const ChatRoom = () => {
	const location = useLocation();
	const { user, roomnum } = location.state || {};

	const [users, setUsers] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		if (user && roomnum) {
			socket.emit("join-room", { username: user, roomnum:roomnum }, (response: { success: boolean }) => {
				if (response.success) {
					console.log(`Joined room ${roomnum} successfully.`);
				} else {
					console.log("Failed to join room.");
				}
			});
		}
	}, [user, roomnum]);

	useEffect(()=>{

		//Listen for updated-users
		socket.on("update-users", (updatedUsers: string[]) => {
			console.log("new user");
			setUsers(updatedUsers);
		});

		// Listen for messages
		socket.on("message", (msg) => {
			console.log(msg);
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.off("update-users");
			socket.off("message");
			// socket.disconnect();
		};
	},[]);

	const sendMessage = () => {
		if (message.trim() !== "") {
			socket.emit("send-message", { username: user, message, roomnum });
			setMessages((prev) => [...prev, `${user}:${message}`]);
			setMessage("");
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row h-full">
				<div className="w-1/4 bg-gray-200 p-4">
					<h3 className="text-xl font-bold mb-4">Current Users</h3>
					<ul className="list-disc pl-5">
						{users.map((each, index) => (
							<li key={index} className="mb-2">{each}</li>
						))}
					</ul>
				</div>
				<div className="w-3/4 flex flex-col bg-white p-4">
					<div className="flex-1 overflow-y-auto mb-4">
						{messages.map((msg, index) => (
							<div key={index} className="mb-2">
								{msg}
							</div>
						))}
					</div>
					<div className="flex">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message..."
							className="flex-1 border border-gray-300 p-2 rounded-l"
						/>
						<button
							onClick={sendMessage}
							className="bg-blue-500 text-white p-2 rounded-r"
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
