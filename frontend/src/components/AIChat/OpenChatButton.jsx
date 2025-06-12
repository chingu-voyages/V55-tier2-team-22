import { VscSparkleFilled } from "react-icons/vsc";

function OpenAiChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      flex flex-row items-center 
      w-fit 
      text-sm 
      px-2 py-3 
      m-0 
      bg-gray-800 hover:bg-gray-700 active:bg-gray-600 
      border-2 border-gray-600
      rounded-md"
    >
      <VscSparkleFilled></VscSparkleFilled> &nbsp; <span>Chat</span>
    </button>
  );
}

export default OpenAiChatButton;
