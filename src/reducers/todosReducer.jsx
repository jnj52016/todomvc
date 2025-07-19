export default function todosReducer(todos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // 如果文本为空，则不添加
      if (!action.text || action.text.trim() === '') {
        return todos;
      }
      return [
        ...todos,
        { 
          id: Date.now(), 
          text: action.text.trim(), 
          completed: false,
          important: action.important || false,
          urgent: action.urgent || false
        },
      ];
    case 'DELETE_TODO':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'UPDATE_TODO':
       return todos.map(todo =>
        todo.id === action.id ? { ...todo, text: action.newText } : todo
      );
    case 'TOGGLE_IMPORTANT':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, important: !todo.important } : todo
      );
    case 'TOGGLE_URGENT':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, urgent: !todo.urgent } : todo
      );
    case 'CLEAR_COMPLETED':
      return todos.filter(todo => !todo.completed);
    default:
      throw new Error('未知的 action: ' + action.type);
  }
}