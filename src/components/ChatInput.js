import React, { useRef } from 'react';
import { Paperclip, Send } from 'lucide-react';

const ChatInput = ({ onSend, onFileUpload }) => {
    const [message, setMessage] = React.useState('');
    const fileInputRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex items-center bg-white rounded-lg border border-gray-300 p-2">
            <button 
                onClick={triggerFileInput}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors duration-200"
            >
                <Paperclip size={20} />
            </button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 outline-none px-3 py-1"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={handleSend}
                className="text-blue-500 hover:text-blue-600 p-2 rounded-full transition-colors duration-200"
            >
                <Send size={20} />
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />
        </div>
    );
};

export default ChatInput;