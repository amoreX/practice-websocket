import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import React, { JSX } from "react"; // Add JSX import

const socket = io("http://localhost:4001");
const Landing = (): JSX.Element => {

	const nav = useNavigate();
	const [room, setRoom] = useState<string>("");
	const [username,setUsername]=useState<string>("");
	type response ={
		success:boolean;
	};
	const joinRoom=(): void =>{
		socket.emit("join-room",{username,roomnum:room},(response : response)=>{
			if (response?.success){
				console.log("Joined room");
				nav(`/chat`,{state:
					{
						user:username,
						roomnum:room
					}
				});
			}
		});
	};

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
					<h2 className="text-2xl font-bold mb-6 text-center">Join Room</h2>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
							Username
						</label>
						<input
							type="text"
							id="username"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
							chat Room
						</label>
						<input
							type="text"
							id="room"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter Room code"
							value={room}
							onChange={(e) => setRoom(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
							onClick={() => joinRoom()}
						>
							Send Message
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Landing;
