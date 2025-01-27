import React, { useState, useEffect } from 'react';

const UserForm = ({ editingUser, setEditingUser, setUsers }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (editingUser) setUser(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingUser ? 'PUT' : 'POST';
    const url = editingUser
      ? `http://localhost:3000/api/users/${editingUser.id}`
      : 'http://localhost:3000/api/users';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => {
        setUsers((prev) =>
          editingUser
            ? prev.map((u) => (u.id === editingUser.id ? user : u))
            : [...prev, user]
        );
        setEditingUser(null);
        setUser({ firstName: '', lastName: '', email: '', department: '' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="department"
        value={user.department}
        onChange={handleChange}
        placeholder="Department"
      />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
