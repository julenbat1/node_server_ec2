const express = require('express')
const app = express()
require("./cosas")

require('./processServices')


const palabrasRecibidas = ['1', '2', '3', '4']
app.use( express.static('webpage'))
app.use(express.json())




app.get('/', (req, res) => res.send('Hello World :) u are able to connect to my server, thankiu') )

app.post('/firstPost', (req, res) => {
	const {word}  = req.body

	if(word) palabrasRecibidas.push(word)
	res.sendStatus(200)
})

app.get('/lapaginade/:nombre', (req, res) => {
	const {nombre} = req.params

	res.write(`<b>Hola ${nombre}</b>`)
	res.write(`<image src="https://media.tenor.com/9xx5jJaHPpIAAAAd/fat-guy.gif" alt="eres tu" style="width: 200px; heigth: 360px;">`)
	res.end()
})


app.get('/getAllWords', (req, res) => {
	palabrasRecibidas.forEach(word => res.write(word))

	res.end('\n c\'est fini')
})


app.get('/whatsapp', require('./apis/whatsapp/api.js'))

//app.use('/instagramFollowers', require('./instragamFollowers/routes.js'))




app.listen(3000, () => console.log('listening on port 3000'))
