import { TinyColor, ColorInput } from '@ctrl/tinycolor'

export class GradientError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'GradientError'
	}
}

export type GradientStop = [ColorInput, number]

const defaultStops: GradientStop[] = [
	['#0359b5', 0],
	['#f6ce01', 1],
]

const COLOR_INDEX = 0
const POSITION_INDEX = 1

export class Gradient {
	private _stops: GradientStop[] = []
	private _limit?: number

	constructor(params: Partial<Pick<Gradient, 'stops' | 'limit'>> = {}) {
		const { stops = defaultStops, limit } = params
		this._stops = stops
		this._limit = limit
	}

	get stops() {
		return this._stops
	}

	set stops(value) {
		const error = Gradient._stopArrayValidator(value)
		if (error) {
			throw new GradientError(`Wrong stops format, ${error}`)
		}
		this._stops = value
	}

	get limit() {
		return this._limit
	}

	addStop(value: GradientStop) {
		if (this._limit && this._stops.length >= this._limit) {
			throw new GradientError('Too many stop points')
		}
		const error = Gradient._stopPointValidator(value)
		if (error) {
			throw new GradientError(`Wrong stop format, ${error}`)
		}

		this.stops.push(value)
	}

	removeStopByIndex(index: number) {
		if (this._stops.length < 3) {
			throw new GradientError("Can't remove stop point")
		}

		if (this._stops.length <= index) {
			throw new GradientError("Can't remove stop point")
		}

		this._stops.splice(index, 1)
	}

	static _stopPointValidator(value: GradientStop) {
		if (!Array.isArray(value)) {
			return 'point must be an array'
		}
		if (value.length !== 2) {
			return 'wrong point format'
		}

		const position = value[POSITION_INDEX]
		if (typeof position !== 'number') {
			return 'position must be a number'
		}
		if (position !== Number(position)) {
			return 'position must be a number'
		}
		if (position < 0) {
			return 'position must be between 0 and 1'
		}
		if (position > 1) {
			return 'position must be between 0 and 1'
		}

		const color = new TinyColor(value[COLOR_INDEX])
		if (!color.isValid) {
			return 'color is invalid'
		}

		return null
	}

	static _stopArrayValidator(value: GradientStop[]) {
		if (!Array.isArray(value)) {
			return 'must be an array'
		}
		if (value.length < 2) {
			return 'wrong array format'
		}

		return null
	}
}
