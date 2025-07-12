import { useState } from "react";

function ProfessionalTasks() {
  const [collaborators, setCollaborators] = useState([]);
  const [email, setEmail] = useState('');
  const [filter, setFilter] = useState('all');

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('upcoming');

  const addCollaborator = () => {
    if (email.trim() && !collaborators.includes(email)) {
      setCollaborators([...collaborators, email]);
      setEmail('');
    }
  };

  const removeCollaborator = (emailToRemove) => {
    setCollaborators(collaborators.filter(c => c !== emailToRemove));
    // Remove from assigned tasks
    setTasks(tasks.map(task => task.assignedTo === emailToRemove ? { ...task, assignedTo: '' } : task));
  };

  const addTask = () => {
    if (title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title,
          description,
          dueDate,
          assignedTo,
          status,
        }
      ]);
      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignedTo('');
      setStatus('upcoming');
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">💼 Professional Task Management</h2>

      {/* Collaborator Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">👥 Collaborators</h3>
        <div className="flex items-center mb-3">
          <input
            type="email"
            placeholder="Enter collaborator's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 mr-2 rounded w-full"
          />
          <button onClick={addCollaborator} className="bg-green-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        <ul className="mb-4 list-disc list-inside">
          {collaborators.map((c, idx) => (
            <li key={idx} className="flex justify-between items-center border p-2 rounded bg-gray-100 mb-2">
              <span>{c}</span>
              <button
                onClick={() => removeCollaborator(c)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Task Form */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">➕ Add Task</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded col-span-2"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Assign to...</option>
            {collaborators.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="upcoming">Upcoming</option>
            <option value="my-tasks">My Tasks</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button onClick={addTask} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">🧮 Filters</h3>
        {['all', 'my-tasks', 'upcoming', 'overdue', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 m-1 rounded ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks available.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="border p-4 rounded shadow bg-white">
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p><strong>Due:</strong> {task.dueDate}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Assigned to:</strong> {task.assignedTo || 'Unassigned'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfessionalTasks;
