
 // TODO(P502) : Étape 5.
 // Page d'accueil : présentation et les derniers articles.

import { useState } from "react";
import ArticleCard from "../components/ArticleCard.jsx";
import { articlesDeTest } from "../donnees-test.js";
import BarreRecherche from "../components/BarreRecherche.jsx";
import CommentaireForm from "../components/CommentaireForm.jsx";
import {commentairesDeTest} from "../donnees-test.js";

export default function Accueil() {
  const [valeurRecherche, setValeurRecherche] = useState("");
  const [estFavori, setEstFavori] = useState([]);
  const length = estFavori.length;

 

  const onBasculerFavori = (articleId) => {
    setEstFavori((favorisActuels) =>
      favorisActuels.includes(articleId)
        ? favorisActuels.filter((id) => id !== articleId)
        : [...favorisActuels, articleId]
    );
  };

 const [commentaires, setCommentaires] = useState(commentairesDeTest);

const articlesFiltres = articlesDeTest.filter((article) =>
    article.title.toLowerCase().includes(valeurRecherche.toLowerCase())
  );
  return (
    <div>
      <h1>Accueil</h1>
      <p>Bienvenue sur le blog de Teranga !</p>

      <h2>Derniers articles</h2>

      <BarreRecherche
        valeur={valeurRecherche}
        onChangement={setValeurRecherche}
      />

      {length > 0 && (
        <p>Vous avez {length} article{length > 1 ? "s" : ""} favori{length > 1 ? "s" : ""}.</p>
      )}
      {length === 0 && (
        <p>Vous n'avez pas encore d'articles favoris.</p>
      )}

      <div className="articles-list">
        {articlesFiltres.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            estFavori={estFavori.includes(article.id)}
            onBasculerFavori={onBasculerFavori}
          />
        ))}
      </div>
      <h2>Commentaires</h2>
      <CommentaireForm onAjouter={(commentaire) => onAjouterCommentaire(commentaire)} />
      <ul>
        {commentaires.map((commentaire, index) => (
          <li key={index}>
            <p><strong>{commentaire.name}</strong> : {commentaire.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}