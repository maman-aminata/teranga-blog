// TODO(P301) : Étape 3 (chapitre 3).
// Affiche une liste de cartes d'articles.
// Props attendues : articles (tableau), favoris (tableau d'identifiants), onBasculerFavori (fonction).
import ArticleCard from "./ArticleCard.jsx";
export default function ListeArticles({
  articles,
  favoris,
  onBasculerFavori
}) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={favoris.includes(article.id)}
          onBasculerFavori={onBasculerFavori}
        />
      ))}
    </div>
  );
}
