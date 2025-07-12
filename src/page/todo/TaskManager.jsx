import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskManager() {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Choose Task Management Type</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Personal Task Card */}
                <div
                    onClick={() => navigate('/personal-tasks')}
                    className="cursor-pointer bg-blue-100 hover:bg-blue-200 transition p-6 rounded-xl shadow-lg text-center"
                >
                    <h2 className="text-xl font-semibold text-blue-800">🧘‍♀️ Personal Task Management</h2>
                    <p className="mt-2 text-gray-600">Track your daily tasks, mood, and reflections.</p>
                </div>

                {/* Professional Task Card */}
                <div
                    onClick={() => navigate('/professional-tasks')}
                    className="cursor-pointer bg-green-100 hover:bg-green-200 transition p-6 rounded-xl shadow-lg text-center"
                >
                    <h2 className="text-xl font-semibold text-green-800">💼 Professional Task Management</h2>
                    <p className="mt-2 text-gray-600">Manage team tasks, collaborators, and projects.</p>
                </div>
            </div>
        </div>
    );
}

export default TaskManager;
