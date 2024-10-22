// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setCharacters((prevCharacters) =>
            prevCharacters.filter((character) => character._id !== id)
          );
        } else if (response.status === 404) {
          console.error("User not found.");
        } else {
          throw new Error("Failed to delete user.");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  function updateList(newUser) {
    setCharacters((prevCharacters) => [...prevCharacters, newUser]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;