// src/App.js

// import React, { useState } from 'react';
// import SearchInput from './components/SearchBar';
// import ButtonSearchInput from './components/Button';
// import SchoolList from './components/UserList';
// import schoolUsers from './data/users';
// import './App.css'; // Import our styles


// function App() {
//   const [autoQuery, setAutoQuery] = useState('');
//   const [manualQuery, setManualQuery] = useState('');
//   const [manualResult, setManualResult] = useState();

//   const autoFiltered = schoolUsers.filter(user =>
//     user.name.toLowerCase().includes(autoQuery.toLowerCase())
//   );

//   const handleManualSearch = () => {
//     const filtered = schoolUsers.filter(user =>
//       user.name.toLowerCase().includes(manualQuery.toLowerCase())
//     );
//     setManualResult(filtered);
//   };
 

//   return (
//     <div className="container">
//       <h2>Search User</h2>
//       <div className="columns">
        
//         <div className="column">
//           <h3>Auto Search</h3>
//           <SearchInput query={autoQuery} onQueryChange={setAutoQuery} />
//           <SchoolList users={autoFiltered} />
//         </div>

//         <div className="column">
//           <h3>Search on Button Click</h3>
//           <ButtonSearchInput
//             query={manualQuery}
//             setQuery={setManualQuery}
//             onSearch={handleManualSearch}
//           />
//           <SchoolList users={manualResult} />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;

// Yahan se y code API ko call karkar search item ka h-----------------------------

// import React, { useEffect, useState } from 'react';
// import SearchInput from './components/SearchBar';
// import ButtonSearchInput from './components/Button';
// import SchoolList from './components/UserList';
// import './App.css';

// function App() {
//   const [users, setUsers] = useState([]);             // API se sabhi user ko call karne ke liye
//   const [autoQuery, setAutoQuery] = useState('');
//   const [manualQuery, setManualQuery] = useState('');
//   const [manualResult, setManualResult] = useState([]);

//   // 🔁 API Call once on component mount
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(data => {
//         setUsers(data);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   // Auto Search
//   const autoFiltered = users.filter(user =>
//     user.name.toLowerCase().includes(autoQuery.toLowerCase())
//   );

//   // Button-based Manual Search
//   const handleManualSearch = () => {
//     const filtered = users.filter(user =>
//       user.name.toLowerCase().includes(manualQuery.toLowerCase())
//     );
//     setManualResult(filtered);
//   };

//   return (
//     <div className="container">
//       <h2>Search User</h2>
//       <div className="columns">

//         <div className="column">
//           <h3>Auto Search</h3>
//           <SearchInput query={autoQuery} onQueryChange={setAutoQuery} />
//           <SchoolList users={autoFiltered} />
//         </div>

//         <div className="column">
//           <h3>Search on Button Click</h3>
//           <ButtonSearchInput
//             query={manualQuery}
//             setQuery={setManualQuery}
//             onSearch={handleManualSearch}
//           />
//           <SchoolList users={manualResult} />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;


// Yahan se CRUD Operation code ------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import SearchInput from './components/SearchBar';
import ButtonSearchInput from './components/ButtonSearch';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [autoQuery, setAutoQuery] = useState('');
  const [manualQuery, setManualQuery] = useState('');
  const [manualResult, setManualResult] = useState([]);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = (newUser) => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const userWithId = { id: newId, ...newUser };
    setUsers([...users, userWithId]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditUserData(null);
  };

  const handleSaveUser = (user) => {
    if (user.id) {
      handleEditUser(user);
    } else {
      handleAddUser(user);
    }
  };

  const autoFiltered = users.filter(user =>
    user.name.toLowerCase().includes(autoQuery.toLowerCase())
  );

  const handleManualSearch = () => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(manualQuery.toLowerCase())
    );
    setManualResult(filtered);
  };

  return (
    <div className="container">
      <h2>User Management App</h2>

      <UserForm
        onSave={handleSaveUser}
        initialData={editUserData || { name: '', email: '' }}
        buttonText={editUserData ? "Update User" : "Add User"}
      />

      <div className="columns">
        <div className="column">
          <h3>Auto Search</h3>
          <SearchInput query={autoQuery} onQueryChange={setAutoQuery} />
          <UserList users={autoFiltered} onDelete={handleDeleteUser} onEdit={setEditUserData} />
        </div>

        <div className="column">
          <h3>Search on Button Click</h3>
          <ButtonSearchInput query={manualQuery} setQuery={setManualQuery} onSearch={handleManualSearch} />
          <UserList users={manualResult} onDelete={handleDeleteUser} onEdit={setEditUserData} />
        </div>
      </div>
    </div>
  );
}

export default App;