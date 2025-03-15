
import {useState,useEffect} from "react";
import { io } from "socket.io-client";
import React,{JSX} from "react";

const socket =io("http://localhost:4001");


const chatRoom=(room:number):JSX.Element =>{
	
	return( 
	<>
		<div>
			ok
		</div>
	</>
	)
};

export default chatRoom;