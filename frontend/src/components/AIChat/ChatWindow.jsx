import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiResponser } from "@/util/aiChat/aiResponder";
import { MdCloseFullscreen } from "react-icons/md";
import { VscSparkleFilled } from "react-icons/vsc";
import ChatMessage from "./ChatMessage";

function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const inputEl = useRef(null);
  const responder = useRef(new AiResponser());
  const messageAreaEl = useRef(null);

  function addMessage(msg) {
    setMessages((curr) => [
      ...curr,
      {
        key: self.crypto.randomUUID(),
        ...msg
      }
    ]);
  }

  async function addAiResponse(prompt) {
    try {
      const response = await responder.current.getResponse(prompt);
      addMessage({ text: response, source: "ai" });
    } catch {
      addMessage({
        text: "An error has occurred while processing your request. Please try again later.",
        source: "ai",
        type: "error"
      });
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const userText = inputEl.current.value;

    const message = {
      text: userText,
      source: "user"
    };

    addMessage(message);
    addAiResponse(userText);

    inputEl.current.value = "";
  }

  useEffect(() => {
    if (isOpen) {
      inputEl.current.focus();
      inputEl.current.scrollIntoView({ block: "end" });
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    messageAreaEl.current.scroll(0, messageAreaEl.current.scrollHeight);
  }, [messages])

  return (
    <>
      <div className={"w-80 bg-gray-950 border-1 border-gray-500 rounded-sm" + " " + (!isOpen && "hidden")}>
        {/* Header */}
        <div className="flex flex-row justify-start items-center w-full h-10 px-2 py-2 bg-gray-800">
          <VscSparkleFilled></VscSparkleFilled>
          <span className="ms-2">AI Assistant</span>

          <div className="grow-1"></div>

          <button
            onClick={onClose}
            className="w-8 h-8 p-0 flex justify-center items-center rounded-sm bg-transparent hover:bg-gray-600 active:bg-gray-500"
          >
            <MdCloseFullscreen></MdCloseFullscreen>
          </button>
        </div>

        {/* Message area */}
        <div ref={messageAreaEl} className="h-90 px-2 overflow-y-scroll">
          {messages.map((m) => {
            return <ChatMessage key={m.key} text={m.text} source={m.source} type={m.type}></ChatMessage>;
          })}
        </div>

        {/* Texting area */}
        <form onSubmit={onSubmit} className="w-full h-12 p-2 ml-auto mr-auto bg-gray-800 text-gray-50">
          <input
            ref={inputEl}
            type="text"
            placeholder="Ask a question"
            className="w-full h-full p-2 bg-gray-700 rounded-sm"
          ></input>
        </form>
      </div>
    </>
  );
}

export default ChatWindow;
