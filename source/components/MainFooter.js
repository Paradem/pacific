const ContentWrapper = require('./blocks/ContentWrapper.js')
const Gallery = require('./blocks/Gallery.js')
const Passage = require('./blocks/Passage.js')

// a section of the nav
function navSection (section) {
	return `
		<h2 class="u-type-scale-delta | u-padding-bottom-narrow">
			<a href="${section.url}">${section.heading}</a>
		</h2>
		${Gallery(section.links.map(link => `
			<li><a href="${link.url}">${link.label}</a></li>
		`).join(''), {
			size: 'small',
			gutter: 'narrow'
		})}
	`
}

// footer nav and subscribe sections
function navGrid (menu, footerStrings) {
	return `
		${menu && `
			<nav class="c-gallery-item | u-color-bg-bg">
				<div class="u-padding-x-outside u-padding-y">
					${ContentWrapper(`
						<div class="u-padding-bottom u-margin-bottom | u-border-bottom">
							${navSection(menu.countries)}
						</div>
						${Gallery(menu.secondary.map((section) => `
							<li>
								${navSection(section)}
							</li>
						`).join(''), {
							size: 'small',
							gutter: 'medium'
						})}
					`, { width: 'wide' })}
				</div>
			</nav>
		`}
		<div class="c-gallery-item | u-color-bg-bg">
			<div class="u-padding-x-outside u-padding-y">
				${ContentWrapper(`
					<form action="">
						<label
							class="u-type-heading u-scale-delta | u-display-block | u-padding-bottom-narrow"
							for="footer-subscribe"
						>
							${footerStrings.newsletterLabel}
						</label>
						<div class="c-bookend horizontal@xsmall | c-gutter narrow">
							<div class="c-bookend-item left fill | c-gutter-item">
								<input
									type="email"
									id="footer-subscribe"
									name="footer-subscribe"
									placeholder="${footerStrings.newsletterInputPlaceholder}"
								>
							</div>
							<div class="c-bookend-item right | c-gutter-item">
								<button class="b-button">${footerStrings.newsletterButton}</button>
							</div>
						</div>
					</form>
					${Passage(`
						<p>${footerStrings.newsletterBlurb}</p>
					`, { className: 'u-padding-top-narrow u-color-fg-secondary' })}
				`)}
			</div>
		</div>
	`
}

module.exports = ({
	logo = '',
	title = '',
	menu,
	footerStrings,
	resourcesIndex
} = {}) => {
	return `
		<footer
			class="u-border-top | u-type-scale-zeta"
			role="contentinfo"
		>

			<!-- logo and search -->
			<div class="u-padding-x-outside u-padding-y-narrow | u-border-bottom">
				<div class="c-bookend horizontal | c-gutter">
					<div
						class="c-bookend-item left | c-gutter-item"
						style="max-width: 10rem;"
					>
						<img
							src="${logo}"
							alt="${title}"
						>
					</div>
					<div
						class="c-bookend-item right fill | c-gutter-item"
						x-data="{
							searchTerm: '',
							searchPath: '/resources/?searchTerm='
						}"
					>
						<label
							class="u-hide-visually"
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
				</div>
			</div>

			<!-- footer nav & subscribe -->
			${Gallery(navGrid(menu, footerStrings), {
				size: 'large',
				tag: 'div',
				gutter: 1,
				className: 'u-color-bg-border'
			})}

			<!-- copyright & contact -->
			<aside class="u-border-top | u-padding-x-outside u-padding-y-narrow">
				<div class="c-bookend horizontal@small | c-gutter narrow">
					<p class="c-bookend-item | c-gutter-item | u-type-font-display">
						<strong class="u-type-weight-bold">UNICEF</strong> Pacific Regional Council for Early Childhood Development
						<small>${footerStrings.copyright}</small>
					</p>
					<div class="c-bookend-item | c-gutter-item | u-type-font-display">
						<a class="u-color-fg-highlight" href="/contact">
							Contact us
						</a>
					</div>
				</div>
			</aside>
		</footer>
	`
}
