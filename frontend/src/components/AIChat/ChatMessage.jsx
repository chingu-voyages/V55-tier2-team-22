import BotAvatar from "./BotAvatar";

function UserMessage({ text }) {
  return (
    <div
      className="
      min-w-8 w-fit max-w-5/6
      px-2 py-2
      my-3 ml-auto
      bg-gray-50
      text-gray-950
      rounded-sm rounded-tr-none
      wrap-break-word
      "
    >
      {text}
    </div>
  );
}

function AiMessage({ text }) {
  return (
    <div className="flex flex-row my-3">
      <BotAvatar></BotAvatar>
      <div
        className="
        w-5/6
        px-2 py-2
        ml-2 mr-auto
        bg-gray-50
        text-gray-950
        rounded-sm rounded-tl-none
        wrap-break-word
        "
      >
        {text}
      </div>
    </div>
  );
}

function ErrorMessage({ text }) {
  return (
    <div
      className="
      min-w-6 w-fit max-w-5/6
      px-2 py-2
      ml-auto mr-auto my-3
      bg-red-300
      text-xs text-red-950
      border-1 border-red-700
      rounded-sm
      wrap-break-word
      "
    >
      {text}
    </div>
  );
}

function ChatMessage({ text, source, type }) {
  if (source === "user") {
    return <UserMessage text={text}></UserMessage>;
  } else if (source === "ai") {
    if (type === "error") {
      return <ErrorMessage text={text}></ErrorMessage>;
    } else {
      return <AiMessage text={text}></AiMessage>;
    }
  }
}

export default ChatMessage;
