import React, { useState, useEffect } from 'react';

function Note() {
  const [note, setNote] = useState('');

  // Load saved note from localStorage on mount
  useEffect(() => {
    const savedNote = localStorage.getItem('myNote');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  // Save to localStorage when note changes
  const handleSave = () => {
    localStorage.setItem('myNote', note);
    alert('Note saved!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Note</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={10}
        className="w-full p-2 border rounded mb-4 resize-none"
        placeholder="Write your note here..."
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}

export default Note;
