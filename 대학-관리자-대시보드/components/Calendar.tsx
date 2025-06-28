import React, { useState } from 'react';
import { Todo } from '../types';
import Card from './Card';

interface CalendarProps {
  todos: Todo[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onTaskSelect: (taskId: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ todos, selectedDate, onDateSelect, onTaskSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
  };
  
  const dateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderCells = () => {
    const cells = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      const cloneDay = new Date(day);
      const isCurrentMonth = day.getMonth() === currentDate.getMonth();
      const isSelected = dateToYMD(day) === dateToYMD(selectedDate);
      const isToday = dateToYMD(day) === dateToYMD(new Date());
      const tasksOnDay = todos.filter(todo => todo.date === dateToYMD(cloneDay));

      cells.push(
        <div
          key={day.toString()}
          className={`flex flex-col items-center justify-center aspect-square border-t border-l border-gray-200/80 cursor-pointer transition-colors duration-200 
            ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'} 
            ${!isCurrentMonth ? 'bg-slate-50/70' : ''}
            ${isSelected ? 'bg-indigo-100' : 'hover:bg-slate-200'}
          `}
          onClick={() => onDateSelect(cloneDay)}
        >
          <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${isToday ? 'bg-indigo-500 text-white font-bold shadow' : ''}`}>
            {day.getDate()}
          </span>
          {tasksOnDay.length > 0 && <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1"></div>}
        </div>
      );
      day.setDate(day.getDate() + 1);
    }
    return cells;
  };
  
  const selectedDayTasks = todos.filter(t => t.date === dateToYMD(selectedDate));

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-semibold text-indigo-600">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
        {daysOfWeek.map(day => <div key={day} className="font-medium">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 flex-grow border-r border-b border-gray-200/80">
        {renderCells()}
      </div>
       {selectedDayTasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200/80">
            <h3 className="font-semibold mb-3 text-lg text-indigo-600">
               {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} 일정
            </h3>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2">
              {selectedDayTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => onTaskSelect(task.id)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-105 ${
                    task.completed 
                    ? 'bg-slate-200 text-slate-500 line-through' 
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  {task.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <span>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
    </Card>
  );
};

export default Calendar;