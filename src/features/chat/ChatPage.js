import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatInput from '../../components/ChatInput';

const ChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('tab1');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSendMessage = (message) => {
        console.log('Sending message:', message);
    };

    const handleFileUpload = (file) => {
        console.log('File selected:', file.name);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div className={`flex flex-col flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* 新的按鈕區域，始終置中 */}
                <div className="bg-white shadow-md p-4 flex justify-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab('tab1')}
                            className={`px-4 py-2 rounded ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Single Agent Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('tab2')}
                            className={`px-4 py-2 rounded ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Multi Agent Chat
                        </button>
                    </div>
                </div>

                {/* 主要內容區域 */}
                <div className="flex-grow overflow-auto p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {activeTab === 'tab1' ? 'Content for Tab 1' : 'Content for Tab 2'}
                    </h1>
                    {/* 這裡可以根據 activeTab 的值來顯示不同的內容 */}
                </div>

                {/* 聊天輸入框 */}
                <div className="bg-white shadow-md p-4">
                    <ChatInput onSend={handleSendMessage} onFileUpload={handleFileUpload} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;