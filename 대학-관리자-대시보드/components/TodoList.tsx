import React, { useState, useMemo, useEffect, useRef, forwardRef } from 'react';
import { Todo } from '../types';
import Card from './Card';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateMemo: (id: string, memo: string) => void;
  isMemoOpen: boolean;
  onToggleMemo: () => void;
}

const TodoItem = forwardRef<HTMLLIElement, TodoItemProps>(({ todo, onToggle, onDelete, onUpdateMemo, isMemoOpen, onToggleMemo }, ref) => {
  const [memo, setMemo] = useState(todo.memo);

  const handleMemoSave = () => {
    onUpdateMemo(todo.id, memo);
  };
  
  return (
    <li ref={ref} className="p-3 bg-white/80 rounded-lg flex flex-col transition-all duration-300 shadow-sm hover:shadow-md">
       <div className="flex items-center">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="w-5 h-5 rounded bg-gray-200 border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 mr-4 shrink-0" />
        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{todo.text}</span>
        <button onClick={onToggleMemo} className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
        </button>
        <button onClick={() => onDelete(todo.id)} className="p-1 text-gray-500 hover:text-red-500 transition-colors ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
       </div>
       <div className={`transition-all duration-500 ease-in-out grid ${isMemoOpen ? 'grid-rows-[1fr] opacity-100 pt-2' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <textarea 
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                onBlur={handleMemoSave}
                placeholder="메모를 입력하세요..."
                className="w-full bg-slate-100 rounded-md p-2 text-sm text-gray-700 focus:ring-1 focus:ring-indigo-500 focus:outline-none ml-9"
                rows={3}
            />
          </div>
       </div>
    </li>
  );
});


interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedDate: Date;
  activeMemoId: string | null;
  setActiveMemoId: React.Dispatch<React.SetStateAction<string | null>>;
}


const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, selectedDate, activeMemoId, setActiveMemoId }) => {
  const [newTodoText, setNewTodoText] = useState('');
  const itemRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());

  useEffect(() => {
    if (activeMemoId) {
        const node = itemRefs.current.get(activeMemoId);
        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }
  }, [activeMemoId]);


  const dateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => todo.date === dateToYMD(selectedDate))
      .sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
  }, [todos, selectedDate]);


  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: new Date().toISOString(),
      text: newTodoText,
      date: dateToYMD(selectedDate),
      completed: false,
      memo: '',
    };
    setTodos(prev => [...prev, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateMemo = (id: string, memo: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, memo: memo } : todo));
  };
  
  const handleToggleMemo = (id: string) => {
    setActiveMemoId(prevId => (prevId === id ? null : id));
  };

  return (
    <Card className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-2 text-indigo-600">
        {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric'})} 할 일
      </h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="새로운 할 일 추가..."
          className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition">
          추가
        </button>
      </form>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {filteredTodos.length > 0 ? (
          <ul className="space-y-3">
            {filteredTodos.map(todo => (
              <TodoItem 
                ref={(node) => {
                  if (node) {
                      itemRefs.current.set(todo.id, node);
                  } else {
                      itemRefs.current.delete(todo.id);
                  }
                }}
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdateMemo={updateMemo}
                isMemoOpen={activeMemoId === todo.id}
                onToggleMemo={() => handleToggleMemo(todo.id)}
              />
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>선택한 날짜에 할 일이 없습니다.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TodoList;