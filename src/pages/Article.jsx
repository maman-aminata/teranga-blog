// TODO(P403) : Étape 4 puis 5.
// Détail d'un article (paramètre d'URL id) et ses commentaires.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListeCommentaires from "../components/ListeCommentaires.jsx";

export default function Article() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    ])
      .then(async ([reponseArticle, reponseCommentaires]) => {
        if (!reponseArticle.ok || !reponseCommentaires.ok) {
          throw new Error("Erreur de chargement");
        }

        const donneesArticle = await reponseArticle.json();
        const donneesCommentaires = await reponseCommentaires.json();

        setArticle(donneesArticle);
        setCommentaires(donneesCommentaires);
      })
      .catch(() => {
        setErreur("Impossible de charger l'article.");
      })
      .finally(() => {
        setChargement(false);
      });
  }, [id]);

  if (chargement) {
    return <p>Chargement de l'article...</p>;
  }

  if (erreur || !article) {
    return <p>{erreur || "Article introuvable."}</p>;
  }

  return (
    <div className="page-article">
      <h1>{article.title}</h1>

      <p>{article.body}</p>

      <h2>Commentaires</h2>

      <ListeCommentaires commentaires={commentaires} />
    </div>
  );
}
