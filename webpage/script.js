//window.onload = function(){

	const canvasEl = document.getElementById('#canvasEl')
	const aspiradora = document.getElementById('#aspiradora')

	console.log(canvasEl)

	let socket = io("ws://63.35.252.202:3024");

	socket.on("connection", socket => {
		socket.emit("subscribe", {productName: "aspiradora"})
		socket.emit("test", "probando")
		socket.on("update", ({productName, price}) => {
			console.log("update recibido", productName)
			aspiradora.innerText = price
		})
	})



//}
