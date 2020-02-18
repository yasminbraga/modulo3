const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/32020615?s=460&v=4",
        name: "Yasmin Braga",
        role: "Estudante - Rocketseat",
        description: 'Aspirante a programadora, focada em absorver conhcimento que alavanquem minha experiência no mercado de trabalho. Estudante da turma Launch Base da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/yasminbraga"},
            { name: "Twitter", url: "https://twitter.com/minbragat"},
            { name: "Linkedin", url: "https://www.linkedin.com/in/yasmin-braga-71a635182/"}
        ]
    }

    return res.render("about", { about })
})

server.get('/portfolio', function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get('/video', function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }
    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log('server is running')
})