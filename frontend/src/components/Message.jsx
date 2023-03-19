const Message = ({ role, content }) => {
  const isAssistant = role === "assistant";
  const chatClass = isAssistant ? "chat chat-start" : "chat chat-end";
  const chatBubbleBg = isAssistant ? "chat-bubble" : "chat-bubble bg-gray-500";
  const header = isAssistant ? "Bot" : "User";

  return (
    <div className={chatClass}>
      <div className="chat-header">{header}</div>
      <div className={chatBubbleBg}>{content}</div>
    </div>
  );
};

export default Message;
