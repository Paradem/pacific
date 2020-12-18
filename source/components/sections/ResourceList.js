const Gallery = require('../blocks/Gallery.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const ResourceCard = require('../blocks/ResourceCard.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

function Search (resourcesIndex) {
	return `
		<div
			class="u-padding-top"
			x-data="{
				searchTerm: '',
				searchPath: '/resources/?searchTerm='
			}"
		>
			<label
				class="u-type-heading u-scale-delta | u-display-block | u-padding-bottom-narrow"
				for="footer-search"
			>
				${resourcesIndex.label}
			</label>
			<div class="c-bookend c-gutter narrow horizontal@xsmall">
				<div class="c-bookend-item c-gutter-item fill left">
					<input
						id="footer-search"
						name="footer-search"
						type="search"
						placeholder="${resourcesIndex.placeholder}"
						x-model="searchTerm"
					>
				</div>
				<div class="c-bookend-item c-gutter-item right">
					<a href="#" x-bind:href="searchPath + searchTerm" class="b-button">${resourcesIndex.button}</a>
				</div>
			</div>
		</div>
	`
}

module.exports = ({
	title,
	introduction = false,
	resources = [],
	callToAction
}, { resourcesIndex } = {}) => {
	return SectionWrapper(`
		<header class="u-margin-y-flow">
			<h2 class="u-type-align-center">
				${title}
			</h2>
			${introduction ? Passage(Markdown(introduction)) : ''}

			<!-- Search bar -->
			${resourcesIndex ? Search(resourcesIndex) : 'shit'}
		</header>

		${resources.length > 0
			? `<div class="u-border-y u-padding-y-wide">
					${Gallery(
						resources.map(resource => ResourceCard(...resource)).join('')
					)}
				</div>`
			: ''
		}

		${callToAction
			? `<div class="u-type-align-center">
					<a class="b-button" href="#">About ECD &rsaquo;</a>
				</div>`
			: ''
		}
	`, { className: 'u-margin-y-flow-wide' })
}
