import { useState } from "react";

function PersonalTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState('😄');
  const [priority, setPriority] = useState('Medium');
  const [tag, setTag] = useState('Personal');
  const [note, setNote] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input,
          mood,
          priority,
          tag,
          completed: false,
        },
      ]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">🧘 Personal Task Manager</h2>

      {/* Task Input */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's your task?"
          className="border px-4 py-2 rounded"
        />
        <select value={mood} onChange={(e) => setMood(e.target.value)} className="border px-3 py-2 rounded">
          <option>😄 Happy</option>
          <option>😐 Neutral</option>
          <option>😫 Stressed</option>
          <option>😴 Tired</option>
          <option>😎 Confident</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border px-3 py-2 rounded">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="border px-3 py-2 rounded">
          <option>Personal</option>
          <option>Health</option>
          <option>Habit</option>
          <option>Gratitude</option>
          <option>Finance</option>
        </select>
        <button
          onClick={addTask}
          className="col-span-full sm:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4 mb-8">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Start by adding something above 👆</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 border rounded shadow-sm flex justify-between items-center ${
                task.completed ? 'bg-green-50 text-gray-400 line-through' : 'bg-white'
              }`}
            >
              <div>
                <p className="font-medium text-lg">
                  {task.mood} {task.text}
                </p>
                <p className="text-sm text-gray-500">
                  Priority: <span className="font-semibold">{task.priority}</span> | Tag: <span className="italic">{task.tag}</span>
                </p>
              </div>
              <button
                onClick={() => toggleComplete(task.id)}
                className={`text-sm px-3 py-1 rounded ${
                  task.completed
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Daily Reflection */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📝 Daily Reflection</h3>
        <textarea
          placeholder="Write about your thoughts, learnings, or gratitude for today..."
          className="w-full p-4 border rounded mb-4"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <p className="text-sm text-gray-600">Reflecting daily helps mental clarity 🌱</p>
      </div>
    </div>
  );
}

export default PersonalTasks;
