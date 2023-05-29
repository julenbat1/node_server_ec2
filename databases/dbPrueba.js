const {MongoClient} = require('mongodb')


const notAnUri = "mongodb+srv://ju123:tacosbetterthantalos@cluster0.tzxru2r.mongodb.net/?retryWrites=true&w=majority"

//const client = new MongoClient(notAnUri)

//const connection =  client.connect();


const pruebas = (async function(){
	const client = new MongoClient(notAnUri)
	const connection = client.connect()
	
	const pruebaDB = client.db("prueba")
	const whatsappDB = client.db("whatsapp")

	return {
		whatsapp: {
			currentChats: whatsappDB.collection('currentChats')			
		}
	}
}())


module.exports = {
	pruebas
}
