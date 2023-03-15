import type { Rgba } from './palette'

export interface Text {
	x: number
	y: number
	color: Rgba
	content: string
}

export function composeText(texts: Text[]): { char: string, color: Rgba }[][] {
	const emptyCell = () => ({ char: ' ', color: [0, 0, 0, 0] as Rgba })
	const range = <T>(length: number, fn: () => T): T[] => Array.from({ length }, fn)
	const gridFromSize = (w: number, h: number) => range(h, () => range(w, emptyCell))
	const CHARS_MAX_X = 20
	const CHARS_MAX_Y = 16

	const grid = gridFromSize(CHARS_MAX_X, CHARS_MAX_Y)

	for (const { x: sx, y: sy, content, color } of texts) {
		let y = sy
		for (const line of content.split('\n')) {
			let x = sx
			for (const char of line.split(''))
				if (x <= CHARS_MAX_X && y < CHARS_MAX_Y)
					grid[y]![x++] = { color: color, char }
			y++
		}
	}

	return grid
}
