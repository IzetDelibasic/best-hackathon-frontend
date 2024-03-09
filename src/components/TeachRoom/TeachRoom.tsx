import React from 'react';

const TeachRoom: React.FC = () => {
  const storedUserData = localStorage.getItem('loggedInUserData');
  const { email, id, role } = storedUserData ? JSON.parse(storedUserData) : { email: '', id: '', role: '' };

  return (
    <div>
        
      <p>Email: {email}</p>
      <p>ID: {id}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default TeachRoom;
