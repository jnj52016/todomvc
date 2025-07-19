import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onDelete, onToggle, onUpdate, onToggleImportant, onToggleUrgent }) {
  return (
    <div className="flex flex-col">
      {todos.map(todo => (
        <div key={todo.id} className="group">
          <TodoItem
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onToggleImportant={() => onToggleImportant(todo.id)}
            onToggleUrgent={() => onToggleUrgent(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}