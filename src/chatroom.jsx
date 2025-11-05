import { useEffect, useState, useRef } from "react";

const ChatRoom = ({ username, room, socket, onLeave }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("message");
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = { text: message, room, username };
    socket.emit("send", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="chatroom">
      <header className="chat-header">
        <div>
          <h3>{room}</h3>
          <p className="subtext">Logged in as {username}</p>
        </div>
        <button className="leave-btn" onClick={onLeave}>
          Leave
        </button>
      </header>

      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-bubble ${
              msg.username === username ? "self" : "other"
            }`}
          >
            <p className="sender">{msg.username}</p>
            <p className="text">{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
