<template>
	<div class="vue-gpickr">
		<color-picker v-model="currentColor" :preset-colors="null" />

		<div class="vue-gpickr-inner-container">
			<div class="vue-gpickr-preview-container">
				<div class="vue-gpickr-preview" :style="previewStyle" />
			</div>

			<div ref="stopsContainer" class="vue-gpickr-stops-container">
				<div class="vue-gpickr-stops-preview-container">
					<div
						class="vue-gpickr-stops-preview"
						:style="stopsPreviewStyle"
						@click.stop.prevent="addStop($event)"
					/>
				</div>
				<div
					v-for="(_, index) in stops"
					:key="index"
					class="vue-gpickr-stop"
					:style="stopStyle(index)"
					:class="{ active: index == currentStopIdx }"
					@mousedown.stop="handleMouseDown(index)"
					@touchstart.stop="handleTouchstart(index)"
				/>
			</div>

			<div class="vue-gpickr-controls-container">
				<div class="vue-gpickr-slider-container">
					<input v-model="angle" type="range" min="0" max="360" step="1" />
					<div class="label">Angle</div>
				</div>
				<div class="vue-gpickr-input-container">
					<input v-model="angle" type="text" />
					<div class="label">Deg&deg;</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// @ts-ignore have to type it
import { Sketch } from '@ckpack/vue-color'
import { HSL, RGBA, HSV, ColorFormats } from '@ctrl/tinycolor'
import { defineComponent } from 'vue'
import { LinearGradient } from '../util'
import { GradientStop } from '../util/Gradient'

const COLOR_INDEX = 0
const POSITION_INDEX = 1
const REMOVE_TRESHOLD = 50

interface VueColor {
	hsl: HSL
	hex: string
	hex8: string
	rgba: RGBA
	hsv: HSV
	oldHue: HSL['h']
	source: ColorFormats
	a: RGBA['a']
}

export default defineComponent({
	components: {
		colorPicker: Sketch,
	},
	props: {
		modelValue: {
			type: LinearGradient,
			default: () => new LinearGradient(),
		},
	},
	emits: ['update:modelValue'],
	data: (): { currentStopIdx: number; containerBoundingClientRectangle: DOMRect | null } => ({
		currentStopIdx: 0,
		containerBoundingClientRectangle: null,
	}),
	computed: {
		angle: {
			get() {
				return this.modelValue.angle
			},
			set(val: string) {
				let degrees = parseInt(val, 10) || 0
				if (degrees < 0) {
					degrees = 0
				}
				while (degrees > 360) {
					degrees = 360
				}

				this.emitInput(degrees, this.stops, this.limit)
			},
		},
		stops(): GradientStop[] {
			return this.modelValue.stops.slice().map((stop) => [...stop])
		},
		previewStyle() {
			return { background: this.getGradientString(this.angle) }
		},
		stopsPreviewStyle() {
			return { background: this.getGradientString(90) }
		},
		currentColor: {
			get() {
				return this.stops[this.currentStopIdx][COLOR_INDEX]
			},
			set(val: VueColor) {
				this.stops[this.currentStopIdx][COLOR_INDEX] = val.hex8
				this.emitInput(this.angle, this.stops, this.limit)
			},
		},
		orderedStops() {
			return this.stops.slice().sort((a, b) => a[POSITION_INDEX] - b[POSITION_INDEX])
		},
		limit() {
			return this.modelValue.limit
		},
	},
	beforeUnmount() {
		this.unbindEventListeners()
	},
	methods: {
		emitInput(angle?: number, stops?: GradientStop[], limit?: number) {
			this.$emit('update:modelValue', new LinearGradient({ angle, stops, limit }))
		},
		getGradientString(angle: number) {
			const stops = this.orderedStops
				.map((stop) => `${stop[COLOR_INDEX].toString()} ${stop[POSITION_INDEX] * 100}%`)
				.join(',')
			return `linear-gradient(${angle}deg, ${stops})`
		},
		setCurrentStopIdx(index: number) {
			this.currentStopIdx = index
		},
		stopStyle(index: number) {
			const stop = this.stops[index]
			return { left: `${stop[POSITION_INDEX] * 100}%`, color: stop[COLOR_INDEX].toString() }
		},
		addStop(event: MouseEvent) {
			const target = event.target as HTMLElement
			if (this.limit && this.stops.length >= this.limit) {
				return
			}
			const position = Math.round((event.offsetX * 100) / target.offsetWidth) / 100
			const index = this.stops.length
			this.stops.push([this.currentColor, position])
			this.setCurrentStopIdx(index)
			this.emitInput(this.angle, this.stops, this.limit)
		},
		removeCurrentStop() {
			this.stops.splice(this.currentStopIdx, 1)
			if (this.currentStopIdx > 0) {
				this.setCurrentStopIdx(this.currentStopIdx - 1)
			}
			this.unbindEventListeners()
			this.emitInput(this.angle, this.stops, this.limit)
		},
		setContainerBoundingClientRectangle() {
			this.containerBoundingClientRectangle = (
				this.$refs.stopsContainer as HTMLDivElement
			).getBoundingClientRect()
		},

		handleMouseDown(index: number) {
			this.setCurrentStopIdx(index)
			this.setContainerBoundingClientRectangle()
			window.addEventListener('mousemove', this.handleChange)
			window.addEventListener('mouseup', this.handleMouseUp)
		},
		handleMouseUp() {
			this.unbindEventListeners()
		},
		unbindEventListeners() {
			window.removeEventListener('mousemove', this.handleChange)
			window.removeEventListener('mouseup', this.handleMouseUp)
			window.removeEventListener('touchmove', this.handleChange)
			window.removeEventListener('touchend', this.handleTouchend)
			window.removeEventListener('touchcancel', this.handleTouchend)
		},
		handleTouchstart(index: number) {
			this.setCurrentStopIdx(index)
			this.setContainerBoundingClientRectangle()
			window.addEventListener('touchmove', this.handleChange, { passive: false })
			window.addEventListener('touchend', this.handleTouchend)
			window.addEventListener('touchcancel', this.handleTouchend)
		},
		handleTouchend() {
			this.unbindEventListeners()
		},

		// TouchEvent constructor is not universal so gotta typesafe manually
		isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
			return Object.prototype.hasOwnProperty.call(event, 'touches')
		},
		getClickPosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
			if (this.isTouchEvent(event)) {
				return { x: event.touches[0].clientX, y: event.touches[0].clientY }
			} else {
				return { x: event.clientX, y: event.clientY }
			}
		},
		handleChange(event: MouseEvent | TouchEvent) {
			event.preventDefault()
			event.stopPropagation()

			const { x, y } = this.getClickPosition(event)
			const { bottom, left, width } = this.containerBoundingClientRectangle ?? {
				bottom: 0,
				left: 0,
				width: 0,
			}

			if (this.stops.length > 2) {
				// Gradient must have at least 2 stops
				const verticalDistance = Math.abs(y - bottom)

				if (verticalDistance > REMOVE_TRESHOLD) {
					this.removeCurrentStop()
					return
				}
			}

			const leftOffset = x - left

			const containerWidth = width

			let position
			if (leftOffset < 0) {
				position = 0
			} else if (leftOffset > containerWidth) {
				position = 1
			} else {
				position = Math.round((leftOffset * 100) / containerWidth) / 100
			}

			const previousPosition = this.stops[this.currentStopIdx][POSITION_INDEX]
			this.stops[this.currentStopIdx][POSITION_INDEX] = position
			if (previousPosition != position) {
				this.emitInput(this.angle, this.stops, this.limit)
			}
		},
	},
})
</script>

<style lang="stylus" scoped>
:deep(.vc-sketch) {
	box-shadow: none;
	padding: 10px;
	.vc-sketch-presets {
		display: none;
	}
	.vc-sketch-saturation-wrap {
		overflow: visible;
	}
	.vc-saturation-pointer {
		margin-top: -2px;
	}
	.vc-sketch-field {
		input {
			text-align: center;
			padding: 4px 0 3px;
		}
	}
}
.vue-gpickr {
	position: relative;
	display: inline-flex;
	flex-direction: row;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.15);
	.vue-gpickr-inner-container {
		padding: 10px;
		padding-left: 0;
		user-select: none;
		@css {
			.vue-gpickr-preview-container,
			.vue-gpickr-stops-preview-container {
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC);
			}
		}

		.vue-gpickr-preview-container {
			width: 200px;
			height: 150px;
			background-size: 10px;
			position: relative;
			.vue-gpickr-preview {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
		.vue-gpickr-stops-container {
			position: relative;
			.vue-gpickr-stops-preview-container {
				width: 200px;
				height: 24px;
				background-size: 10px;
				position: relative;
				margin-top: 4px;
				border-radius: 2px;
				@css {
				}
				.vue-gpickr-stops-preview {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					border-radius: 2px;
					box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 0 4px rgba(0, 0, 0, 0.25);
				}
			}
			.vue-gpickr-stop {
				position: absolute;
				bottom: 0;
				width: 12px;
				height: 12px;
				transform: translate(-6px, 6px);
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				&::before {
					content: '';
					width: 4px;
					height: 4px;
					box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
						0 0 1px 2px rgba(0, 0, 0, 0.4);
					border-radius: 50%;
					background: currentColor;
				}
				&.active {
					z-index: 3;
					&::before {
						content: '';
						box-shadow: 0 0 0 2.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
							0 0 1px 3px rgba(0, 0, 0, 0.4);
						width: 6px;
						height: 6px;
					}
				}
			}
		}
		.vue-gpickr-controls-container {
			margin-top: 8px;
			display: flex;
			font-size: 0;
			.vue-gpickr-slider-container {
				flex-grow: 1;
				input {
					box-sizing: border-box;
					width: 100%;
					height: 19px;
					margin: 0 2px;
					padding: 0;
					background-color: transparent;
					appearance: none;
					outline: none;
					&::-webkit-slider-thumb {
						-webkit-appearance: none;
						cursor: pointer;
						width: 5px;
						border-radius: 1px;
						height: 10px;
						border: 0;
						box-shadow: 0 0 2px rgba(0, 0, 0, 0.6), inset 0 0 0 0.5px rgba(0, 0, 0, 0.4);
						background: #fff;
						z-index: 2;
					}

					&::-moz-range-thumb {
						cursor: pointer;
						width: 5px;
						border-radius: 1px;
						height: 10px;
						border: 0;
						box-shadow: 0 0 2px rgba(0, 0, 0, 0.6), inset 0 0 0 0.5px rgba(0, 0, 0, 0.4);
						background: #fff;
					}

					&::-ms-thumb {
						cursor: pointer;
						width: 5px;
						border-radius: 1px;
						height: 10px;
						border: 0;
						box-shadow: 0 0 2px rgba(0, 0, 0, 0.6), inset 0 0 0 0.5px rgba(0, 0, 0, 0.4);
						background: #fff;
					}

					&::-webkit-slider-runnable-track {
						width: 100%;
						height: 10px;
						cursor: pointer;
						background: rgba(0, 0, 0, 0.05);
						border: 0;
						border-radius: 2px;
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
						z-index: 1;
					}

					&::-moz-range-track {
						width: 100%;
						height: 10px;
						cursor: pointer;
						background: rgba(0, 0, 0, 0.05);
						border: 0;
						border-radius: 2px;
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
					}

					&::-ms-track {
						width: 100%;
						height: 10px;
						cursor: pointer;
						background: transparent;
						border-color: transparent;
						border-width: 16px 0;
						color: transparent;
					}
					&::-ms-fill-lower {
						border: 0;
						background: rgba(0, 0, 0, 0.05);
						border-radius: 2px;
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
					}
					&::-ms-fill-upper {
						border: 0;
						background: rgba(0, 0, 0, 0.05);
						border-radius: 2px;
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
					}
				}
			}
			.vue-gpickr-input-container {
				width: 30px;
				margin-left: 8px;
				input {
					text-align: center;
					box-sizing: border-box;
					width: 100%;
					padding: 4px 0 3px;
					border: none;
					outline: none;
					box-shadow: inset 0 0 0 1px #ccc;
					font-size: 10px;
				}
			}
			.label {
				text-align: center;
				font-size: 11px;
				color: #222;
				padding-top: 3px;
				padding-bottom: 4px;
				text-transform: capitalize;
			}
		}
	}
}
@media (max-width: 430px) {
	.vue-gpickr {
		flex-direction: column;
		.vue-gpickr-inner-container {
			padding-left: 10px;
			padding-top: 0;
		}
	}
}
</style>
