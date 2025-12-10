import TodoCardViewButtonGroup from '../../components/CardView/TodoCardViewButtonGroup';
import Tag from '../../components/Tag/Tag';
import { useState } from 'react';
const useTodoUI = () => {
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const handleDeleteClick = (id) => setSelectedTodoId(id); //*
  const handleUpdate = (id) => setSelectedTodoId(id); // *

  const setTag = (todo) => {
    const dueDate = new Date(todo.dueDate);
    const currentDate = new Date();
    if (todo.isCompleted) return ['Completed', 'success'];
    if (!todo.isCompleted && dueDate >= currentDate)
      return ['Ongoing', 'primary'];
    if (!todo.isCompleted && dueDate < currentDate)
      return ['Overdue', 'warning'];
    return ['Uncategorized', 'warning'];
  };

  const loadTableViewData = (todos, currentStatus) => {
    currentStatus = currentStatus.toLowerCase();
    let result = todos?.map((todo) => {
      const [tagName, color] = setTag(todo);
      const status = <Tag tagName={tagName} color={color} />;

      return {
        id: todo._id,
        coverphoto: 'None',
        title: todo.title,
        status,
        startDate: new Date(todo.createdAt).toLocaleTimeString(),
        dueDate: new Date(todo.dueDate).toLocaleTimeString(),
        action: (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TodoCardViewButtonGroup tagName={tagName} id={todo._id} />
          </div>
        ),
      };
    });
    return result;
  };

  return {
    selectedTodoId,
    setSelectedTodoId,
    handleDeleteClick,
    handleUpdate,
    loadTableViewData,
  };
};

export default useTodoUI;
