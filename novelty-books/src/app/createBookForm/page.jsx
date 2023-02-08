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
    <div className={styles.container}>
    <form className={styles.bookForm} onSubmit={handleSubmit}>
      <h2 className={styles.h2}>Create Book</h2>
      <label ><strong>Title:</strong></label>
      <input
        className="form-control"
        type="text"
        name="title"
        onChange={handleChange}
        value={data.title}
        placeholder="Title..."
      />
      <br />
      <label ><strong>Author:</strong> </label>
      <input
        className="form-control"
        type="text"
        name="author"
        onChange={handleChange}
        value={data.author}
        placeholder="Author..."
      />
      <br />
      <label ><strong>Publish Date:</strong></label>
      <input
        className="form-control"
        type="date"
        name="publishDate"
        onChange={handleChange}
        value={data.publishDate}
        placeholder="Publish Date..."
      />
      <br />
      <label ><strong>Genres:</strong></label>
      <br />
      {genres.map((genre) => (
        <label
          className={styles.formControl}
          key={genre}
          style={{ margin: "5px" }}
        >
          <input
            className="form-check-inpu"
            type="checkbox"
            name="genre"
            value={genre}
            onChange={handleChange}
          />
          {genre}
        </label>
      ))}
      <br />
      <label><strong>Description:</strong></label>
      <br style={{ lineHeight: 0.5 }} />
      <textarea
        className="form-control"
        type="text"
        name="description"
        onChange={handleChange}
        value={data.description}
        placeholder="Description..."
        style={{ height: "100px", width: "400px" }}
      />
      <br />
      <label><strong>Page Count:</strong></label>
      <input
        className="form-control"
        type="number"
        name="pageCount"
        onChange={handleChange}
        value={data.pageCount}
        placeholder="Page Count..."
        min="1"
      />
      <br />
      <label><strong>Price:</strong></label>
      <input
        className="form-control"
        type="number"
        name="price"
        onChange={handleChange}
        value={data.price}
        placeholder="Price..."
        min="1"
      />
      <br />
      <label><strong>Stock:</strong></label>
      <input
        className="form-control"
        type="number"
        name="stock"
        onChange={handleChange}
        value={data.stock}
        placeholder="Stock..."
        min="1"
      />
      <br />
      <label><strong>Image:</strong></label>
      <input
        style={{margin: 10}}
        type="file"
        onChange={(event) => {
          setFormImage(event.target.files[0]);
        }}
        accept="image/*"
      />
      <br />
        <div className="text-center">
          <button className={styles.buttonControl} type="submit" value="Create Book" >Create Book</button>
        </div>
    </form>
    </div>
  );
}
