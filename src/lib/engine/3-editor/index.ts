import { textToTune } from '../1-base/tune'
import { webEngine } from '../2-web'
import { playTune } from './tune'
import { parseScript } from 'esprima'
import { normalizeGameError, type EsprimaError } from './error'
import { bitmaps, NormalizedError } from '../../state'

interface RunResult {
	error: NormalizedError | null
	cleanup: () => void
}

export function runGame(code: string, canvas: HTMLCanvasElement, onPageError: (error: NormalizedError) => void): RunResult {
	const game = webEngine(canvas)
	
	const tunes: any[] = []
	const timeouts: number[] = []
	const intervals: number[] = []

	const errorListener = (event: ErrorEvent) => {
		onPageError(normalizeGameError({ kind: 'page', error: event.error }))
	}
	window.addEventListener('error', errorListener)
	
	const cleanup = () => {
		game.cleanup()
		tunes.forEach(tune => tune.end())
		timeouts.forEach(clearTimeout)
		intervals.forEach(clearInterval)
		window.removeEventListener('error', errorListener)
	}

	const api = {
		...game.api,
		setTimeout: (fn: TimerHandler, ms: number) => {
			const timer = setTimeout(fn, ms)
			timeouts.push(timer)
			return timer
		},
		setInterval: (fn: TimerHandler, ms: number) => {
			const timer = setInterval(fn, ms)
			intervals.push(timer)
			return timer
		},
		setLegend: (..._bitmaps: [string, string][]) => {
			bitmaps.value = _bitmaps
			return game.api.setLegend(..._bitmaps)
		},
		playTune: (text: string, n: number) => {
			const tune = textToTune(text)
			const playTuneRes = playTune(tune, n)
			tunes.push(playTuneRes)
			return playTuneRes
		}
	}

	code = `"use strict";\n${code}`
	
	try {
		parseScript(code)
	} catch (error) {
		return {
			error: normalizeGameError({ kind: 'parse', error: error as EsprimaError }),
			cleanup
		}
	}
	
	try {
		const fn = new Function(...Object.keys(api), code)
		fn(...Object.values(api))
		return { error: null, cleanup }
	} catch (error) {
		return {
			error: normalizeGameError({ kind: 'runtime', error }),
			cleanup
		}
	}
}

export function runGameHeadless(code: string): void {
	const game = webEngine(document.createElement('canvas'))

	const api = {
		...game.api,
		setTimeout: () => {},
		setInterval: () => {},
		setLegend: (..._bitmaps: [string, string][]) => {
			bitmaps.value = _bitmaps
			return game.api.setLegend(..._bitmaps)
		},
		playTune: () => {}
	}

	code = `"use strict";\n${code}`
	try {
		const fn = new Function(...Object.keys(api), code)
		fn(...Object.values(api))
	} catch {}
	
	game.cleanup()
}