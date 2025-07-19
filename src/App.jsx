import { useReducer, useState, useEffect } from 'react';

// Reducer 和子组件的导入
import todosReducer from './reducers/todosReducer';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import QuadrantTable from './components/QuadrantTable';

// 初始状态备用值
const initialTodos = [
  { id: 1, text: '学习React', completed: false, important: true, urgent: true },
  { id: 2, text: '掌握Tailwind CSS', completed: true, important: true, urgent: false },
  { id: 3, text: '完成这个Todo应用', completed: false, important: false, urgent: true }
];

// 艾森豪威尔四象限排序函数
const sortByEisenhowerMatrix = (todos) => {
  return [...todos].sort((a, b) => {
    // 首先按照完成状态排序，未完成的排在前面
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // 对于未完成的任务，按照四象限排序
    // 第一象限：重要且紧急 - 最高优先级
    if (a.important && a.urgent && !(b.important && b.urgent)) {
      return -1;
    }
    if (b.important && b.urgent && !(a.important && a.urgent)) {
      return 1;
    }
    
    // 第二象限：重要但不紧急 - 第二优先级
    if (a.important && !a.urgent && !(b.important && !b.urgent)) {
      return -1;
    }
    if (b.important && !b.urgent && !(a.important && !b.urgent)) {
      return 1;
    }
    
    // 第三象限：紧急但不重要 - 第三优先级
    if (!a.important && a.urgent && !(!b.important && b.urgent)) {
      return -1;
    }
    if (!b.important && b.urgent && !(!a.important && a.urgent)) {
      return 1;
    }
    
    // 如果在同一象限，按照创建时间（ID）排序，较早的排在前面
    return a.id - b.id;
  });
};

export default function App() {
  // --- State 和 Reducer ---
  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : initialTodos;
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all');
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [showQuadrantTable, setShowQuadrantTable] = useState(true);

  // --- 数据持久化 Effect ---
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // --- Action 创建函数 ---
  const addTodo = () => {
    dispatch({ 
      type: 'ADD_TODO', 
      text: newTodoText, 
      important: isImportant, 
      urgent: isUrgent 
    });
  };
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', id });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', id });
  const updateTodo = (id, newText) => dispatch({ type: 'UPDATE_TODO', id, newText });
  const toggleImportant = (id) => {
    if (id) {
      dispatch({ type: 'TOGGLE_IMPORTANT', id });
    } else {
      setIsImportant(!isImportant);
    }
  };
  const toggleUrgent = (id) => {
    if (id) {
      dispatch({ type: 'TOGGLE_URGENT', id });
    } else {
      setIsUrgent(!isUrgent);
    }
  };
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  // --- 事件处理函数 ---
  const handleAddTodo = () => {
    addTodo();
    setNewTodoText('');
    setIsImportant(false);
    setIsUrgent(false);
  };

  // --- 派生状态 (Derived State) ---
  // 先过滤，再排序
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  // 对过滤后的待办事项进行排序
  const visibleTodos = sortByEisenhowerMatrix(filteredTodos);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4 flex flex-col items-center font-sans">
      
      {/* 主内容卡片容器 */}
      <div id="app-container" className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden mx-auto">
        
        <TodoHeader 
          newTodoText={newTodoText}
          setNewTodoText={setNewTodoText}
          onAddTodo={handleAddTodo}
          important={isImportant}
          urgent={isUrgent}
          onToggleImportant={() => toggleImportant()}
          onToggleUrgent={() => toggleUrgent()}
        />

        <TodoList 
          todos={visibleTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onToggleImportant={toggleImportant}
          onToggleUrgent={toggleUrgent}
        />

        <Footer 
          todosCount={todos.length}
          activeTodosCount={activeTodosCount}
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />

        {showQuadrantTable && <QuadrantTable />}
        

      </div>
      
      <div className="text-center text-gray-500 text-sm mt-6">
        艾森豪威尔四象限法则 © {new Date().getFullYear()}
      </div>
    </div>
  );
}