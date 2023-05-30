const {Server} = require("socket.io")
const {createServer} = require("node:http")



const httpServer = createServer()
const io = new Server(httpServer, {cors: {
    origin: "http://63.35.252.202:3000",
    methods: ["GET", "POST"]
  }})

const products = {
	aspiradora: new Product("aspiradora", 20),
	vacuumCleaner: new Product("vacuumCleaner", 30),
	cuchara: new Product("cuchara", 1)
}

const subs = (function(){

	const products  = {
		aspiradora: {
			clients: new Set()
		},
		vacuumCleaner: {
			clients: new Set()
		},
	}

	this.notifyChange = function(productName){
		if(productName in products) {
			products[productName].clients.forEach(socket => socket.emit("update", {productName: productName, price:  products[productName].price }))
		}
	}

	this.subscribe =  function(productName, socket){
		this.products[productName].clients.add(socket);
	}

	this.unsubscribe =  function(productName, socket){
		this.products[productName].clients.delete(socket);
	}

})();

function Product(name, initialPrice){
	this.name =  name
	this.price = initialPrice

	this.addPrice = (addValue) => this.price += addValue
	this.restPrice = restValue => this.price -= restValue
	

}


console.log(subs)

setInterval(() => {
	products.aspiradora.addPrice(10)
	subs.notifyChange("aspiradora")
	
}, 5000)

io.on("connection", (socket) => {
//	console.log("new socket connection", socket)
	socket.on("subscribe", ({productName}) => subs.subscribe(productName, socket) )
	socket.on("test", (data) => console.log(data))	
	socket.on("unsubscribe", ({productName}) => subs.unsubscribe(productName, socket) )
})







httpServer.listen("3024", () => console.log("http server listening on 3024"))
