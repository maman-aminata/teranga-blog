// TODO(P101) : Étape 1 (chapitre 1) puis étape 2 (chapitre 2).
// Carte d'un article.
// Props attendues : article (objet avec id, userId, title, body), et plus tard estFavori, onBasculerFavori.
import {useState}from "react";
export default function ArticleCard({ article , estFavori, onBasculerFavori }) {

  return (
    <div className="article-card">
      <h2>{article.title }</h2>
      <p>{article.body }</p>
      <button onClick={() => onBasculerFavori(article.id)}>
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button> 
    </div>

  );
  
  
    
}

