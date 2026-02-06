import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/testing");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        minHeight: "100vh",
        background: "#e8c2ca",
        flexWrap: "wrap",
      }}
    >
      {users.map((user, index) => (
        <DataBox key={index} user={user} />
      ))}
    </div>
  );
}

export default App;

const DataBox = ({ user }) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        padding: "12px",
        background: "#fff",
      }}
    >
      <h3>{user.username}</h3>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
    </div>
  );
};
