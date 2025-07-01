import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const notifications = [
  {
    id: 1,
    title: 'New Message',
    description: 'You have received a new message from Admin.',
    time: '2 mins ago',
    type: 'info',
  },
  {
    id: 2,
    title: 'Payment Successful',
    description: 'Your subscription payment was completed successfully.',
    time: '1 hour ago',
    type: 'success',
  },
  {
    id: 3,
    title: 'Update Available',
    description: 'A new version of the app is available for download.',
    time: 'Yesterday',
    type: 'warning',
  },
  {
    id: 4,
    title: 'Security Alert',
    description: 'We noticed a login attempt from a new device.',
    time: '2 days ago',
    type: 'error',
  },
];

const typeColors = {
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-700',
};

function Notification() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <NotificationsIcon className="text-blue-500" />
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded shadow-sm border ${typeColors[notif.type]} transition-all`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold">{notif.title}</h3>
              <span className="text-xs">{notif.time}</span>
            </div>
            <p className="text-sm">{notif.description}</p>
          </div>
        ))}
      </div>

  
    </div>
  );
}

export default Notification;
