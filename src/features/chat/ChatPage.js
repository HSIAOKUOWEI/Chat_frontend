import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ChatInput from '../../components/chatpage/ChatInput';
import useChatStore from '../../stores/chatStore';

const { Header, Sider, Content, Footer } = Layout;

const ChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messages = useChatStore((state) => state.messages);  // 获取全局消息状态

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={!isSidebarOpen}
                collapsedWidth={0}
                trigger={null}
                style={{ background: '#001529', color: '#fff' }}
            >
                <div style={{ padding: '16px', color: '#fff' }}>
                    Sidebar Content
                </div>
            </Sider>

            <Layout style={{ background: '#f0f2f5' }}>
                <Header style={{ background: '#f0f2f5', padding: '0 16px', color: '#001529', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        type="text"
                        onClick={toggleSidebar}
                        icon={isSidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    />
                    <h1 style={{ color: '#001529', textAlign: 'center', flex: 1 }}>Chat Application</h1>
                </Header>

                <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', borderRadius: '8px' }}>
                    {/* 显示消息列表 */}
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} inline-block p-2 rounded`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </Content>

                <Footer style={{ padding: '0 24px', background: '#f0f2f5', borderTop: '1px solid #e8e8e8' }}>
                    <ChatInput />
                </Footer>
            </Layout>
        </Layout>
    );
};

export default ChatPage;
