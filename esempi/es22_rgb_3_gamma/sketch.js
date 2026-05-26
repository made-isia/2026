
let immagineA


function preload() {
	immagineA = loadImage("gradient.png")
}

function setup() {
	createCanvas(256, 256)
	immagineA.loadPixels()
}

function gammaCorrection(value, gamma) {
	return Math.pow(value / 255, 1 / gamma) * 255
}

function draw() {
	background(0)


	for (let y = 0; y < height; y++) {
		for (let x = 0; x < height; x++) {
			const col = pixel(immagineA, x, y)


			let gamma = 1.0
			if (y < immagineA.height / 2) {
				gamma = 0.9
			} else {
				gamma = 1.0
			}

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
