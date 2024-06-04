import { FC, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

type AppState = {
  Params: { name?: string; room?: string };
  State: { user: string; text: string }[];
  Message: string;
};

const ChatPage: FC = () => {
  const socket = io("https://socket-server-1cc4.onrender.com");
  const { search } = useLocation();
  const [params, setParams] = useState<AppState["Params"]>({});
  const [state, setState] = useState<AppState["State"]>([]);
  const [message, setMessage] = useState<AppState["Message"]>("");
  const [users, setUsers] = useState<AppState["Params"][]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setState((_state) => [..._state, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("joinRoom", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    socket.emit("sendM", { message, params });
    setMessage("");
  };

  const out = () => {
    socket.emit("out", params);
    navigate("/");
  };

  return (
    <div>
      <h1>{params?.room}</h1>
      <h2>{users.length}</h2>
      <h2 onClick={out}>out</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {state.map((m, i) => (
          <span key={i}>{m.text}</span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          placeholder="message"
        />
      </form>
    </div>
  );
};

export default ChatPage;
