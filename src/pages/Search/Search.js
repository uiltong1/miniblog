import styles from "./Search.module.css";

import PostDetail from "../../Components/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("post", search);

  return (
    <div className={styles.search_container}>
      <h1>Search</h1>
      <div>
        {posts &&
          posts.map((post) => <PostDetail key={post.uid} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link className="btn" to="/post/create">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
