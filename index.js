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
    const id = parseInt(req.params.id);
    let produit = produits.find(parking => parking.id === id);

   produits.splice(produits.indexOf(produit), 1);
    produit.nom = req.body.nom;
    produit.prix = req.body.prix;
    produit.quantite = req.body.quantite;
    res.status(200).json(produits);
});





// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est démarré sur http://localhost:${port}`)
})