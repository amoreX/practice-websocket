
import { Routes,Route } from "react-router-dom";
import Landing from "./landing/landing";
import ChatRoom from "./chatroom/chatroom";

const App =()=>{
	return(
	<Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>

	)

}

export default App;