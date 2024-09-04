import React, { useState, useRef } from 'react';
import { UploadOutlined, SendOutlined, FileOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import useChatStore from '../../stores/chatStore';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);  // 保存上傳的文件
    const [isSending, setIsSending] = useState(false);  // 控制發送按鈕狀態
    const { addMessage } = useChatStore();
    const textareaRef = useRef(null);

    const handleSend = async () => {
        if ((message.trim() || uploadedFiles.length > 0) && !isSending) {
            setIsSending(true);  // 禁用發送按鈕
            addMessage({ text: message, files: uploadedFiles });  // 儲存消息和文件
    
            try {
                await onSend({ text: message, files: uploadedFiles });
            } catch (error) {
                console.error("Error sending message", error);
            } finally {
                setMessage('');
                setUploadedFiles([]);
                resetTextareaHeight();
                setIsSending(false);
            }
        }
    };
    
    

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prevFiles => {
            const newFiles = files.filter(file => !prevFiles.some(f => f.name === file.name && f.size === file.size));
            return [...prevFiles, ...newFiles];
        });
    };

    const handleFileRemove = (index) => {
        setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleTextareaChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    const resetTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = '40px';
        }
    };

    return (
        <div className="p-2 bg-gray-100 border-t border-gray-300">
            {/* 上傳文件的預覽區域，提供刪除按鈕 */}
            {uploadedFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap space-x-2">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            {file.type.startsWith('image/') ? (
                                <>
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-10 h-10 object-cover rounded"
                                        width={50}
                                        height={50}
                                        preview={true}
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleFileRemove(index)}
                                        type="text"
                                        danger
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <FileOutlined className="text-xl text-gray-600 mr-2" />
                                        <span className="text-sm">{file.name}</span>
                                    </div>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleFileRemove(index)}
                                        type="text"
                                        danger
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 輸入區域 */}
            <div className="flex items-center">
                {/* 上傳文件按鈕 */}
                <label className="cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                    />
                    <UploadOutlined className="text-2xl text-gray-500 mr-2 hover:text-gray-700" />
                </label>

                {/* 消息輸入框 */}
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your message..."
                    className="flex-grow p-2 border border-gray-300 rounded resize-none overflow-hidden"
                    rows={1}
                    style={{ maxHeight: '200px', minHeight: '40px' }}
                />

                {/* 發送消息按鈕，發送中禁用 */}
                <Button
                    icon={<SendOutlined />}
                    type="primary"
                    onClick={handleSend}
                    disabled={isSending}
                    className="ml-2"
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
