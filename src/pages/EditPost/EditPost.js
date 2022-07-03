import styles from "./EditPost.module.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("post", id);
  const { updateDocument, response } = useUpdateDocument("post");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(",");
      setTags(textTags);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);

      if (!title || !image || !body || !tags) {
        throw new Error("Por favor, preencha todos os campos");
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      console.log(tagsArray)

      const data = {
        title,
        image,
        body,
        tagsArray,
      };

      updateDocument(id, data);

      navigate("/dashboard");
    } catch (error) {
      if (error.message.includes("Invalid URL")) {
        error.message = "URL da imagem inválida.";
      }
      setFormError(error.message);
      return;
    }
  };

  return (
    <div className={styles.edit_post}>
      <h2>Editando post: {post && post.title}</h2>
      <p>Altere os dados do post como desejar</p>
      {post && (
        <>
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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
              <input className="btn" type="submit" value="Atualizar" />
            )}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
