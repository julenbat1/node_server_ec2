
(function(){
	console.log(process.getgid())
})();

const autoCheck = setInterval(() => {
	console.log('Free memory for nodejs >>', process.constrainedMemory())
}, 60 * 1000)


process.on('Message', (message, sendHandle) => {
	console.log(message)
})

process.on('uncaughtException', (err, origin) => {
	console.log('Ha ocurrido un error que no está controlado > \n', err)
	console.log('The exception from origin is the next one > \n', origin )
})
