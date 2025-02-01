import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/index.ts';

const SearchTasks: React.FC = () => {
  const [query, setQuery] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.id.toString().includes(query),
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks by title or ID"
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTasks;
