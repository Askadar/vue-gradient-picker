import tinycolor, { ColorFormats } from '@ctrl/tinycolor'
import { Gradient, GradientError } from './Gradient'

const COLOR_INDEX = 0
const POSITION_INDEX = 1

export class LinearGradient extends Gradient {
	private _type: 'linear' = 'linear'
	private _angle: number = 0

	constructor(params: Partial<Pick<LinearGradient, 'angle' | 'stops' | 'limit'>> = {}) {
		const { angle = 0, stops = undefined, limit = undefined } = params

		super({ stops, limit })
		this._angle = angle
	}

	get angle() {
		return this._angle
	}

	set angle(value) {
		const error = LinearGradient._angleValidator(value)
		if (error) {
			throw new GradientError(`Wrong angle value, ${error}`)
		}
		this._angle = value
	}

	get type() {
		return this._type
	}

	static _angleValidator(value: number) {
		if (typeof value !== 'number') {
			return 'must be a number'
		}
		if (value !== Number(value)) {
			return 'must be a number'
		}
		if (value < 0) {
			return 'must be between 0 and 360'
		}
		if (value > 360) {
			return 'must be between 0 and 360'
		}
		return null
	}

	toString(colorFormat: ColorFormats = 'hex8') {
		const stops = this.stops
			.slice()
			.sort((a, b) => a[POSITION_INDEX] - b[POSITION_INDEX])
			.map(
				(stop) =>
					`${tinycolor(stop[COLOR_INDEX]).toString(colorFormat)} ${(
						stop[POSITION_INDEX] * 100
					).toFixed()}%`,
			)
			.join(', ')

		return `linear-gradient(${this.angle}deg, ${stops})`
	}

	toRaw(colorFormat: ColorFormats = 'hex8') {
		const stops = this.stops
			.slice()
			.sort((a, b) => a[POSITION_INDEX] - b[POSITION_INDEX])
			.map((stop) => {
				stop[COLOR_INDEX] = tinycolor(stop[COLOR_INDEX]).toString(colorFormat)
				return stop
			})

		return {
			type: this.type,
			angle: this.angle,
			stops,
			limit: this.limit,
		}
	}
}
