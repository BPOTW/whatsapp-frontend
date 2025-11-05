import { useEffect, useState } from "react";
import JoinGroup from "./Joingroup";
import ChatRoom from "./chatroom";
import "./App.css";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";
let socket;

function App() {
  const [joined, setJoined] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", room: "" });

  useEffect(() => {
    socket = io(SOCKET_URL);
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("disconnect", () => console.log("Disconnected"));
    return () => socket.disconnect();
  }, []);

  const handleJoin = ({ username, room }) => {
    setUserInfo({ username, room });
    socket.emit("join", room);
    setJoined(true);
  };

  const handleLeave = () => {
    socket.emit("leave", userInfo.room);
    setUserInfo({ username: "", room: "" });
    setJoined(false);
  };

  return (
    <div className="app-wrapper">
      {!joined ? (
        <JoinGroup onJoin={handleJoin} />
      ) : (
        <ChatRoom
          username={userInfo.username}
          room={userInfo.room}
          socket={socket}
          onLeave={handleLeave}
        />
      )}
    </div>
  );
}

export default App;
