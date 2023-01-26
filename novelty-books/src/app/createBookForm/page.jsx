"use client";
import React, { useState } from "react";

const genres = ["Fantasy", "Horror", "Scy-Fiction", "Drama", "Adventure"] // Aqui ponen los generos que quieran poner en el checkbox

const CreateBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishDate: "",
    genre: [],
    description: "",
    pageCount: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the server to create a new book using the form data
      const res = await fetch("http://localhost:3001/books", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={formData.title}
        placeholder="Title"
      />
      <input
        type="text"
        name="author"
        onChange={handleChange}
        value={formData.author}
        placeholder="Author"
      />
      <input
        type="text"
        name="publishDate"
        onChange={handleChange}
        value={formData.publishDate}
        placeholder="Publish Date"
      />
       {genres.map(genre => (
        <label key={genre}>
          <input
            type="checkbox"
            name="genre"
            value={genre}
            onChange={handleChange}
          />
          {genre}
        </label>
      ))}
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={formData.description}
        placeholder="Description"
      />
      <input
        type="number"
        name="pageCount"
        onChange={handleChange}
        value={formData.pageCount}
        placeholder="Page Count"
      />
      <input
        type="number"
        name="price"
        onChange={handleChange}
        value={formData.price}
        placeholder="Price"
      />
      <input
        type="text"
        name="image"
        onChange={handleChange}
        value={formData.image}
        placeholder="Image URL"
      />
      <input type="submit" value="Create Book" />
    </form>
  );
};

export default CreateBookForm;
