import React from 'react';

export default function TodoHeader({ newTodoText, setNewTodoText, onAddTodo, important, urgent, onToggleImportant, onToggleUrgent }) {
  // 处理回车键添加
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTodoText.trim() !== '') {
      onAddTodo();
    }
  };

  return (
    <>
      {/* 标题容器 */}
      <div className="w-full px-4 pt-6 pb-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin text-red-400 mb-4 sm:mb-6 text-center opacity-80">
          艾森豪威尔todos
        </h1>
        <p className="text-center text-sm text-gray-500 mb-2">
          任务按四象限自动排序：紧急且重要(Q1) → 重要但不紧急(Q2) → 紧急但不重要(Q3) → 不紧急不重要(Q4)
        </p>
        <p className="text-center text-xs text-gray-400 mb-2">
          同一象限内按创建时间排序，先创建的任务在上方
        </p>
      </div>

      {/* 主内容卡片容器的头部 */}
      <div className="flex flex-col p-4 border-b border-gray-200">
        <div className="flex items-center w-full mb-3 sm:mb-0">
          <input
            type="text"
            placeholder="需要做什么？"
            className="w-full text-lg placeholder-gray-300 italic outline-none border-b-2 border-gray-100 focus:border-blue-300 transition-colors py-2"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-3">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm w-20 ${
                important 
                ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600' 
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 border border-gray-300'
              }`}
              onClick={onToggleImportant}
              title="重要程度"
            >
              {important ? '重要' : '不重要'}
            </button>
            <button
              className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm w-20 ${
                urgent 
                ? 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600' 
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 border border-gray-300'
              }`}
              onClick={onToggleUrgent}
              title="紧急程度"
            >
              {urgent ? '紧急' : '不紧急'}
            </button>
          </div>
          <button
            className="mt-3 sm:mt-0 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 transition-colors shadow-sm font-medium"
            onClick={onAddTodo}
            disabled={newTodoText.trim() === ''}
          >
            添加
          </button>
        </div>
      </div>
    </>
  );
}