import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import TimerStopwatch from './components/TimerStopwatch';
import QuickLinks from './components/QuickLinks';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);

  const Header: React.FC = () => (
    <header className="mb-6 md:mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 py-2">
        대학 관리자 대시보드
      </h1>
    </header>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Clock />
            <QuickLinks />
            <TimerStopwatch />
          </div>
          <div className="lg:col-span-5 xl:col-span-4">
            <Calendar 
              todos={todos}
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setActiveMemoId(null); // 날짜 변경 시 메모 닫기
              }}
              onTaskSelect={(taskId) => setActiveMemoId(taskId)}
            />
          </div>
          <div className="lg:col-span-4 xl:col-span-5">
            <TodoList 
              todos={todos}
              setTodos={setTodos}
              selectedDate={selectedDate}
              activeMemoId={activeMemoId}
              setActiveMemoId={setActiveMemoId}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;