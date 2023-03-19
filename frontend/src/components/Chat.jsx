import { useState, useEffect, useRef } from "react";
import Message from "./Message";

const Chat = () => {
  const [userData, setUserData] = useState("");
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4455/users/me", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [displayMessages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    setDisplayMessages((prevDisplayMessages) => [
      ...prevDisplayMessages,
      { role: "user", content: inputMessage },
    ]);

    setIsLoading(true);
    setInputMessage("");
    try {
      const response = await fetch(
        "http://localhost:4455/ai?conversation=" +
          encodeURIComponent(inputMessage),
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            messages: messages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);

      setDisplayMessages((prevDisplayMessages) => [
        ...prevDisplayMessages,
        data,
      ]);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: inputMessage },
        data,
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="md:py-20 mx-auto md:w-2/3 p-2">
      <div className="bg-white p-2 rounded">
        <h1 className="md:text-2xl text-xl font-bold text-white bg-blue-600 p-2 rounded shadow-lg text-center">
          Hallo {userData.username}, ich bin dein persönlicher Fitnessberater -
          wie kann ich dir helfen?
        </h1>

        <div
          className="messages-container overflow-y-auto max-h-[60vh] mt-4"
          ref={messagesEndRef}
        >
          {displayMessages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && <Message content={"Loading..."} role={"assistant"} />}
        </div>

        <div className="flex p-2 mt-4">
          <input
            type="text"
            value={inputMessage}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Stelle deine Frage"
            className="input flex-grow flex-shrink outline outline-1 mr-2"
          />
          <button onClick={sendMessage} className="btn bg-blue-700">
            Senden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
