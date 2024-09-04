import create from 'zustand';

const useChatStore = create((set) => ({
    messages: [],
    
    // 添加消息
    addMessage: (newMessage) =>
        set((state) => ({ messages: [...state.messages, newMessage] })),
    
    // 清空消息
    clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
