
let gradient

function setup() {
	createCanvas(256, 256)


	gradient = createImage(256, 256)
	gradient.loadPixels()
	for (let y = 0; y < gradient.height; y++) {
		for (let x = 0; x < gradient.width; x++) {
			const col = pixel(gradient, x, y)
			const i = (x + y * gradient.width) * 4
			gradient.pixels[i + 0] = x
			gradient.pixels[i + 1] = x
			gradient.pixels[i + 2] = x
		}
	}

}

function gammaCorrection(value, gamma) {
	return Math.pow(value / 255, 1 / gamma) * 255
}

function draw() {
	background(0)

	const valoriGamma = [
		0.5,
		1.0,
		1.5,
		2.0,
		2.5,
	]


	for (let y = 0; y < gradient.height; y++) {

		const id = floor(y / (gradient.height / valoriGamma.length))
		const gamma = valoriGamma[id]

		for (let x = 0; x < gradient.width; x++) {
			const col = pixel(gradient, x, y)
			const r = gammaCorrection(col.r, gamma)
			const g = gammaCorrection(col.g, gamma)
			const b = gammaCorrection(col.b, gamma)
			set(x, y, color(r, g, b))
		}
	}

	updatePixels()
}

function pixel(imm, x, y) {
	if (x < 0 || x >= imm.width || y < 0 || y >= imm.height) return { r:0, g: 0, b: 0, a: 0}
	const i = (x + y * imm.width) * 4
	const r = imm.pixels[i + 0]
	const g = imm.pixels[i + 1]
	const b = imm.pixels[i + 2]
	const a = imm.pixels[i + 3]
	return {r, g, b, a}
}
