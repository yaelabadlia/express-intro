import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
    console.log("GET : /")
    res.end("GET : /")

})
app.route(['/home', '/accueil'])
    .get((req, res) => {
        console.log(`GET : ${req.url}`)
        // res.end(`GET : ${req.url}`)
        res
        .type("html")
        .sendFile(import.meta.dirname + '/index.html')
        // next()
    })
    .post((req, res) => {
        console.log(`POST : ${req.url}`)
        res.end(`POST : ${req.url}`)
        // next()
    })


app.all("/personne", (req, res) => {
    console.log(`${req.method} : ${req.url}`)
    res.end(`${req.method} : ${req.url}`)
})

app.get('/adresse', (req, res) => {
    res.end(`Ici c'est ${req.query['ville']} - ${req.query.cp}`)

})
app.get('/adresse/:ville/:cp', (req, res) => {
    res.end(`Ici c'est ${req.params['ville']} - ${req.params.cp}`)

})
// app.get(['/home', '/accueil'], (req, res) => {
//     console.log(`GET : ${req.url}`)
//     res.end(`GET : ${req.url}`)
//     // next()
// })
// app.post(['/home', '/accueil'], (req, res) => {
//     console.log(`POST : ${req.url}`)
//     res.end(`POST : ${req.url}`)
//     // next()
// })

app.get('/calcul/:op', (req, res) => {
    const { a, b } = req.query
    switch (req.params.op) {
        case 'plus': res.end(`${a} + ${b} = ${Number(a) + Number(b)}`); break;
        case 'moins': res.end(`${a} - ${b} = ${Number(a) - Number(b)}`); break;
        case 'fois': res.end(`${a} * ${b} = ${Number(a) * Number(b)}`); break;
        case 'div': res.end(`${a} / ${b} = ${Number(a) / Number(b)}`); break;
        default: res.end(`L'opérateur ${req.params.op} est inconnu`)
    }
})

// middleware pour les routes restantes : à placer en dernier
app.get('/*splat', (req, res) => {
    console.log("GET : La route demandée n'existe pas")
    res
        .status(404)
        .type("json")
        .json({
            "Erreur": "La page demandée n'existe pas"
        })
    // res
    //     .sendStatus(404)
    // res
    //     .status(404)
    //     .end("GET : La route demandée n'existe pas")

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})