import React, { useState } from 'react';

function Profile() {
  const [profile] = useState({
    name: 'Sangram Bal',
    email: 'balsangram1@gmail.com',
    phone: '6370404471',
    gender: 'Male',
    dob: '1999-01-01',
    address: 'Bhubaneswar, Odisha, India',
    profession: 'Software Engineer',
    bio: 'Passionate about full‑stack development.',
    avatar: '/img/profile.jpg',  // 👈 path in public/
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={profile.avatar}
          alt={`${profile.name} avatar`}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
      <div className="space-y-3 text-gray-700">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Date of Birth:</strong> {profile.dob}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Profession:</strong> {profile.profession}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
      </div>
    </div>
  );
}

export default Profile;
