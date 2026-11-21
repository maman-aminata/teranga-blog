// TODO(P405) : Étape 4 puis 5.
// Fiche d'un auteur (paramètre d'URL id) et ses articles.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListeArticles from "../components/ListeArticles.jsx";

export default function Auteur() {
  const { id } = useParams();

  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    ])
      .then(async ([reponseAuteur, reponseArticles]) => {
        if (!reponseAuteur.ok || !reponseArticles.ok) {
          throw new Error("Erreur de chargement");
        }

        const donneesAuteur = await reponseAuteur.json();
        const donneesArticles = await reponseArticles.json();

        setAuteur(donneesAuteur);
        setArticles(donneesArticles);
      })
      .catch(() => {
        setErreur("Impossible de charger les informations de l'auteur.");
      })
      .finally(() => {
        setChargement(false);
      });
  }, [id]);

  const onBasculerFavori = (articleId) => {
    setFavoris((anciensFavoris) =>
      anciensFavoris.includes(articleId)
        ? anciensFavoris.filter((favori) => favori !== articleId)
        : [...anciensFavoris, articleId]
    );
  };

  if (chargement) {
    return <p>Chargement de l'auteur...</p>;
  }

  if (erreur || !auteur) {
    return <p>{erreur || "Auteur introuvable."}</p>;
  }

  return (
    <div className="page-auteur">
      <h1>{auteur.name}</h1>

      <p>Email : {auteur.email}</p>
      <p>Ville : {auteur.address.city}</p>
      <p>Entreprise : {auteur.company.name}</p>

      <h2>Articles de {auteur.name}</h2>

      <ListeArticles
        articles={articles}
        favoris={favoris}
        onBasculerFavori={onBasculerFavori}
      />
    </div>
  );
}
