// TODO(P304) : Étape 3 (chapitre 3).
// Affiche les commentaires d'un article.
// Props attendues : commentaires (tableau avec id, name, body).
export default function ListeCommentaires({ commentaires }) {
  return (
    <div className="liste-commentaires">
      {commentaires.map((commentaire) => (
        <div className="commentaire" key={commentaire.id}>
          <h4>{commentaire.name}</h4>
          <p>{commentaire.body}</p>
        </div>
      ))}
    </div>
  );
}
