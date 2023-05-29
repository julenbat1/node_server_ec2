const os = require("node:os")

setInterval(() => {

	const cpu = os.cpus()
	cpu.forEach(cpu => console.log(cpu.model))

}, 5000)
