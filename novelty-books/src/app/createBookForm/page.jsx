"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import FormData from "form-data";
import Swal from "sweetalert2";

const genres = ["Fantasy", "Horror", "Scy-Fiction", "Drama", "Adventure"]; // Aqui ponen los generos que quieran poner en el checkbox

export default function CreateBookForm() {
  const [data, setData] = useState({
    title: "",
    author: "",
    publishDate: "",
    genre: [],
    description: "",
    pageCount: "",
    price: "",
    stock: "",
  });
  const [formImage, setFormImage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (
      !data.title ||
      !data.author ||
      !data.publishDate ||
      !data.genre.length ||
      !data.description ||
      !data.pageCount ||
      !data.price ||
      !data.stock ||
      !formImage
    ) {
      Swal.fire({
        title: "Error",
        text: "Please complete all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("publishDate", data.publishDate);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("pageCount", data.pageCount);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("image", formImage);

    try {
      const response = await fetch(process.env.RUTA_BACK+"/books", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    setData({
      title: "",
      author: "",
      publishDate: "",
      genre: [],
      description: "",
      pageCount: "",
      price: "",
      stock: "",
    });
    setFormImage(null);
    Swal.fire({
      title: "Book created successfully!",
      text: "The book has been added to the database.",
      icon: "success",
      confirmButtonText: "Back to Home",
      showCancelButton: true,
      cancelButtonText: "Continue creating books",
    }).then((result) => {
      if (result.value) {
        window.location.href = "/";
      }
    });
  };

  return (
    
    <form className={styles.bookForm} onSubmit={handleSubmit}>
      <label className={styles.formControl}>Title:</label>
      <input
        className={styles.formControl}
        type="text"
        name="title"
        onChange={handleChange}
        value={data.title}
        placeholder="Title..."
      />
      <br />
      <label className={styles.formControl}>Author:</label>
      <input
        className={styles.formControl}
        type="text"
        name="author"
        onChange={handleChange}
        value={data.author}
        placeholder="Author..."
      />
      <br />
      <label className={styles.formControl}>Publish Date:</label>
      <input
        className={styles.formControl}
        type="date"
        name="publishDate"
        onChange={handleChange}
        value={data.publishDate}
        placeholder="Publish Date..."
      />
      <br />
      <label className={styles.formControl}>Genres:</label>
      {genres.map((genre) => (
        <label
          className={styles.formControl}
          key={genre}
          style={{ margin: "5px" }}
        >
          <input
            className={styles.formControl}
            type="checkbox"
            name="genre"
            value={genre}
            onChange={handleChange}
          />
          {genre}
        </label>
      ))}
      <br />
      <label className={styles.formControl}>Description:</label>
      <br style={{ lineHeight: 0.5 }} />
      <textarea
        className={styles.formControl}
        type="text"
        name="description"
        onChange={handleChange}
        value={data.description}
        placeholder="Description..."
        style={{ height: "100px", width: "400px" }}
      />
      <br />
      <label className={styles.formControl}>Page Count:</label>
      <input
        className={styles.formControl}
        type="number"
        name="pageCount"
        onChange={handleChange}
        value={data.pageCount}
        placeholder="Page Count..."
        min="1"
      />
      <br />
      <label className={styles.formControl}>Price:</label>
      <input
        className={styles.formControl}
        type="number"
        name="price"
        onChange={handleChange}
        value={data.price}
        placeholder="Price..."
        min="1"
      />
      <br />
      <label className={styles.formControl}>Stock:</label>
      <input
        className={styles.formControl}
        type="number"
        name="stock"
        onChange={handleChange}
        value={data.stock}
        placeholder="Stock..."
        min="1"
      />
      <br />
      <label>Image:</label>
      <input
        type="file"
        onChange={(event) => {
          setFormImage(event.target.files[0]);
        }}
        accept="image/*"
      />
      <br />
      <input className={styles.formControl} type="submit" value="Create Book" />
    </form>
  );
}
