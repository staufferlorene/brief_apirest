const express = require("express");
const app = express();
const port = 3000;

// Middleware d'analyse du JSON les requêtes
app.use(express.json());

// Données
let produits = [
    { id: 1, nom: "Thé Vert Matcha", prix: 12.99, quantite: 10 },
    { id: 2, nom: "Café Arabica", prix: 8.99, quantite: 20 },
];

// Routes

// GET /produits
// Liste des produits
app.get("/produits", (req,res) => {
    res.json(produits);
})


// POST

app.post("/produits", (req, res) => {

    const newProduit = req.body;
    if (!newProduit || !newProduit.id || !newProduit.nom) { // Vérification des champs
        return res.status(400).json({ message: 'Invalid produits data' });
    }

    produits.push(newProduit); //
    res.status(201).json(newProduit);
});



// PUT

app.put("/produits/:id", (req, res) => {
    const produitId = parseInt(req.params.id);
    let produit = produits.find(produit => produit.id === produitId);

    if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' });
    }
    produit.nom = req.body.nom;
    produit.prix = req.body.prix;
    produit.quantite = req.body.quantite;
    res.status(200).json(produit);
});



// DELETE


app.delete('/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);  // Récupère et convertit l'ID en entier
    const produitIndex = produits.findIndex(produit => produit.id === produitId);  // Recherche l'index du produit

    if (produitIndex === -1) {
        return res.status(404).json({ message: 'Produit non trouvé' });  // Si le produit n'existe pas affiche ce message
    }

    produits.splice(produitIndex, 1);  // Supprime le produit à l'index trouvé
    res.status(200).json(produits);  // Renvoie la liste mise à jour des produits
});





// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est démarré sur http://localhost:${port}`)
})