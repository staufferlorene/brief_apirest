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

    const newProduit = req.body; // Déclaration constante
    if (!newProduit || !newProduit.id || !newProduit.nom) { // Vérification des champs, si produit non trouvé afficher le message
        return res.status(400).json({ message: 'Invalid produits data' });
    }

    produits.push(newProduit); // pousser le nouveau produit ajouté
    res.status(201).json(newProduit);
});



// PUT

app.put("/produits/:id", (req, res) => {

    const produitId = parseInt(req.params.id); // Récupération de l'id
    let produit = produits.find(produit => produit.id === produitId); // Màj du produit

    if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' }); // Si produit non trouvé afficher le message
    }
    // Sinon si produit trouvé le màj
    produit.nom = req.body.nom;
    produit.prix = req.body.prix;
    produit.quantite = req.body.quantite;
    res.status(200).json(produit);
});



// DELETE


app.delete('/produits/:id', (req, res) => {

    const id = parseInt(req.params.id); // Récupération de l'id
    let produit = produits.findIndex(produit => produit.id === id);

    produits.splice(produit); // Suppression du produit
    res.status(200).json(produits);
});



// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est démarré sur http://localhost:${port}`)
})