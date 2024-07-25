"use client";
import { useState, useEffect } from "react";
import { useClient } from "next/client"; // Import useClient hook
import BookTable from "../../Components/BookTable";
import { Modal } from "../../Components/Modal";

const Genre = {
  Fantasy: "Fantasy",
  Novels: "Novels",
  Science: "Science",
  Drama: "Drama",
  Literature: "Literature",
};

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: 0,
    genre: Genre.Fantasy,
    description: "",
    image: "",
    link: "",
  });
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books");
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setAdminAuthorized(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setAdminAuthorized(false);
    setUsername("");
    setPassword("");
  };

  const handleEdit = async (id) => {
    try {
      const url = `http://localhost:3000/api/books/${id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const url = "http://localhost:3000/api/books";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchData(); 
      setShowModal(false); 
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
    setFormData({
      title: "",
      author: "",
      pages: 0,
      genre: Genre.Fantasy, 
      description: "",
      image: "",
      link: "",
    });
  };

  const handleEditClick = (id) => {
    setShowModal(true);
    const bookToEdit = books.find((book) => book.id === id);
    setFormData(bookToEdit);
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:3000/api/books/${id}`;
      await fetch(url, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "pages" ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      handleEdit(formData.id);
    } else {
      handleAdd();
    }
  };

  if (!adminAuthorized) {
    return (
      <div id="log">
        
          <h1 id="f">Admin Authorize</h1>
      
        <input id="log"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input id="log"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button id="log" onClick={handleLogin}>Login</button>
      </div> 


    );
  }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Book
      </button>
      <BookTable
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <Modal
        open={showModal}
        onOK={handleSubmit}
        onCancel={handleCloseModal}
        title={formData.id ? "Edit Book" : "Add Book"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pages"
              className="block text-gray-700 font-bold mb-2"
            >
              Pages:
            </label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-gray-700 font-bold mb-2"
            >
              Genre:
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="text-black border rounded-md px-3 py-2 w-full"
            >
              {Object.values(Genre).map((genre) => (
                <option className='text-black' key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 font-bold mb-2"
            >
              Link (File):
            </label>
            <input
              type="text"
              id="link"
              name="link"
              onChange={handleChange}
              className="text-gray-700 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;

