import {useState, useEffect, useRef } from 'react';

//TodoItem
export default function TodoItem({ todo, onDelete, onToggle, onUpdate, onToggleImportant, onToggleUrgent }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const editInputRef = useRef(null);

    // 当进入编辑模式时，自动聚焦到输入框
    useEffect(() => {
        if (isEditing) {
            editInputRef.current.focus();
        }
    }, [isEditing]);

    // 处理双击事件，进入编辑模式
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    // 处理输入框内容变化
    const handleChange = (e) => {
        setEditText(e.target.value);
    };

    // 提交更新
    const handleSubmit = () => {
        const newText = editText.trim();
        if (newText) {
            onUpdate(todo.id, newText);
        } else {
            // 如果更新后的内容为空，则直接删除该任务
            onDelete(todo.id);
        }
        setIsEditing(false);
    };
    
    // 处理键盘事件
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        } else if (e.key === 'Escape') {
            // 如果按下Esc，则取消编辑，恢复原文本
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    // 获取象限信息
    const getQuadrantInfo = () => {
        if (todo.important && todo.urgent) {
            return { 
                label: "Q1", 
                title: "第一象限：紧急且重要",
                bgColor: "bg-red-50 hover:bg-red-100",
                textColor: "text-red-600"
            };
        }
        if (todo.important && !todo.urgent) {
            return { 
                label: "Q2", 
                title: "第二象限：重要但不紧急",
                bgColor: "bg-orange-50 hover:bg-orange-100",
                textColor: "text-orange-600"
            };
        }
        if (!todo.important && todo.urgent) {
            return { 
                label: "Q3", 
                title: "第三象限：紧急但不重要",
                bgColor: "bg-green-50 hover:bg-green-100",
                textColor: "text-green-600"
            };
        }
        return { 
            label: "Q4", 
            title: "第四象限：不紧急不重要",
            bgColor: "bg-white hover:bg-gray-100",
            textColor: "text-gray-500"
        };
    };

    const quadrantInfo = getQuadrantInfo();

    // 根据是否在编辑状态，渲染不同视图
    if (isEditing) {
        return (
            <div className="w-full flex items-center p-0">
                 <input
                    ref={editInputRef}
                    type="text"
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSubmit} // 当输入框失焦时也提交更新
                    className="w-full h-full text-lg px-4 py-3 border-2 border-blue-400 shadow-inner rounded-md"
                />
            </div>
        );
    }

    return (
        <div className={`w-full flex items-center p-4 border-b border-gray-200 last:border-b-0 transition-colors ${quadrantInfo.bgColor}`}>
            {/* 象限标签 */}
            <div className={`flex items-center justify-center h-6 w-6 rounded-full font-bold text-xs ${quadrantInfo.textColor} border border-current mr-2`} title={quadrantInfo.title}>
                {quadrantInfo.label}
            </div>
            
            {/* 复选框 */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="h-6 w-6 rounded-full border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
            />
            {/* 任务文本 (可双击) */}
            <span onDoubleClick={handleDoubleClick} className={`flex-grow px-4 text-lg cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
            </span>
            
            {/* 重要性和紧急性标签 */}
            <div className="flex mr-4 space-x-2">
                <button 
                    onClick={onToggleImportant}
                    className={`px-2 py-1 text-xs rounded-md transition-colors shadow-sm w-16 ${
                        todo.important 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 border border-gray-300'
                    }`}
                >
                    {todo.important ? '重要' : '不重要'}
                </button>
                <button 
                    onClick={onToggleUrgent}
                    className={`px-2 py-1 text-xs rounded-md transition-colors shadow-sm w-16 ${
                        todo.urgent 
                        ? 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 border border-gray-300'
                    }`}
                >
                    {todo.urgent ? '紧急' : '不紧急'}
                </button>
            </div>
            
            {/* 删除按钮 */}
            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}