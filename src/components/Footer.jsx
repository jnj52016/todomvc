export default function Footer({ 
  todosCount, 
  activeTodosCount, 
  currentFilter, 
  onFilterChange, 
  onClearCompleted 
}) {

  // 如果没有任务，则不渲染底部栏
  if (todosCount === 0) {
    return null;
  }

  // 动态计算按钮样式
  const getButtonClass = (buttonFilter) => {
    const baseClass = "px-2 sm:px-3 py-1 rounded-md hover:bg-blue-50 transition-colors text-sm";
    if (currentFilter === buttonFilter) {
      return `${baseClass} border border-blue-500 text-blue-500`; // 选中状态
    }
    return `${baseClass} border border-transparent`; // 未选中状态
  };

  return (
    <div className="p-3 sm:p-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-200">
      <span className="mb-3 sm:mb-0 text-center sm:text-left">
        <strong>{activeTodosCount}</strong> 项待办
      </span>
      <div className="flex justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-0">
        <button className={getButtonClass('all')} onClick={() => onFilterChange('all')}>所有</button>
        <button className={getButtonClass('active')} onClick={() => onFilterChange('active')}>进行中</button>
        <button className={getButtonClass('completed')} onClick={() => onFilterChange('completed')}>已完成</button>
      </div>
      <button 
        className="text-center sm:text-right hover:underline text-blue-500 hover:text-blue-700 transition-colors" 
        onClick={onClearCompleted}
      >
        清除已完成
      </button>
    </div>
  );
}