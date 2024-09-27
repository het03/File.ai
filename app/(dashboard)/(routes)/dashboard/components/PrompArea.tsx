import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { PaperclipIcon, SendIcon, MicIcon } from "lucide-react";

interface InputFieldProps {
  onSend: (message: string) => void;
  onFileUpload: (file: File) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onSend, onFileUpload }) => {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSend(input);
        setInput("");
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 border rounded-lg bg-white shadow-sm">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <PaperclipIcon className="h-5 w-5 text-gray-500" />
      </button>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message"
        className="flex-grow py-2 bg-transparent border-none focus:outline-none resize-none text-sm"
        rows={1}
      />
      <button
        onClick={() => {
          if (input.trim()) {
            onSend(input);
            setInput("");
          }
        }}
        className="p-2"
      >
        <SendIcon className="h-5 w-5 " />
      </button>
    </div>
  );
};

export default InputField;
