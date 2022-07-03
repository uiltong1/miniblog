import styles from "./CreatePost.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("post");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);

      if (!title || !image || !body || !tags) {
        throw new Error("Por favor, preencha todos os campos");
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

      insertDocument({
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      });

      navigate("/");
    } catch (error) {
      if (error.message.includes("Invalid URL")) {
        error.message = "URL da imagem inválida.";
      }
      setFormError(error.message);
      return;
    }
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Pense em um bom nome"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="Insira uma imagem que representa o post"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Insira o conteúdo do post"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por virgula"
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        {!response.loading && (
          <input className="btn" type="submit" value="Cadastrar" />
        )}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
