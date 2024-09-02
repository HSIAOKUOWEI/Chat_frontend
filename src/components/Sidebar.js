import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <div className="p-4">
          <button 
            onClick={toggleSidebar}
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Close
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          {/* 你可以在这里添加侧边栏的内容 */}
        </div>
      </div>

      {/* 当侧边栏关闭时，显示打开按钮 */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded z-50">
          Open
        </button>
      )}
    </>
  );
};

export default Sidebar;