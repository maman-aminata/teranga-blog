// TODO(P404) : Étape 4 puis 5.
// Liste des auteurs chargés depuis l'API.

import { useEffect, useState } from "react";

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de chargement");
        }
        return response.json();
      })
      .then((data) => {
        setAuteurs(data);
      })
      .catch(() => {
        setErreur("Impossible de charger les auteurs.");
      })
      .finally(() => {
        setChargement(false);
      });
  }, []);

  if (chargement) {
    return <p>Chargement des auteurs...</p>;
  }

  if (erreur) {
    return <p>{erreur}</p>;
  }

  return (
    <div className="page-auteurs">
      <h1>Nos auteurs</h1>

      <div className="liste-auteurs">
        {auteurs.map((auteur) => (
          <div className="carte-auteur" key={auteur.id}>
            <h2>{auteur.name}</h2>
            <p>Email : {auteur.email}</p>
            <p>Ville : {auteur.address.city}</p>
            <p>Entreprise : {auteur.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
