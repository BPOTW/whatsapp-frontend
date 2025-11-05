import { useState } from "react";

const JoinGroup = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) onJoin({ username, room });
  };

  return (
    <div className="join-page">
      <div className="join-card">
        <h2>Enter Chat Room</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Group ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default JoinGroup;
