import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import GalleryProducts from '../components/products/gallery';
import HomeSlider from '../components/homeSlider';
import ViewedProducts from '../components/products/viewed';
import { advantagesData } from '../../locales/advantagesData';
import CategoriesGallery from '../components/categoriesGallery';
import BigBanner from '../components/bigBanner';
import HomeContacts from '../components/homeContacts';
import MapYand from '../components/mapYand';

const IndexContainer = props => {
	const {
		addCartItem,
		state: { pageDetails, settings, advantages = advantagesData, categories }
	} = props;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		React.createElement(HomeSlider, { images: themeSettings.home_slider }),
		pageDetails.content && pageDetails.content.length > 10 && React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement('div', {
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					})
				)
			)
		),
		React.createElement(
			'section',
			{ className: 'advantages section-container' },
			React.createElement(
				'h2',
				{ className: 'advantages__title section__title' },
				'Advantages'
			),
			React.createElement(
				'div',
				{ className: 'advantages__items' },
				advantages.map(item => React.createElement(
					'div',
					{ className: 'advantages__item', key: item.id },
					React.createElement('img', { className: 'advantages__icon', src: item.icon, alt: '' }),
					React.createElement(
						'div',
						{ className: 'advantages__name' },
						item.name
					)
				))
			)
		),
		React.createElement(
			'section',
			{ className: 'categories section-container' },
			React.createElement(
				'h2',
				{ className: 'categories__title section__title' },
				'Categories'
			),
			React.createElement(CategoriesGallery, { categories: categories })
		),
		React.createElement(
			'section',
			{ className: 'popular section-container' },
			React.createElement(
				'h2',
				{ className: 'popular__title section__title' },
				themeSettings.home_products_title
			),
			React.createElement(
				LazyLoad,
				null,
				React.createElement(GalleryProducts, {
					sku: themeSettings.home_products_sku,
					sort: themeSettings.home_products_sort,
					limit: themeSettings.home_products_limit,
					settings: settings,
					addCartItem: addCartItem
				})
			)
		),
		React.createElement(
			'section',
			{ className: 'big-banner section-container' },
			React.createElement(
				LazyLoad,
				null,
				React.createElement(BigBanner, null)
			)
		),
		themeSettings.show_viewed_products && React.createElement(
			LazyLoad,
			null,
			React.createElement(ViewedProducts, {
				settings: settings,
				addCartItem: addCartItem,
				limit: themeSettings.limit_viewed_products || 6
			})
		),
		React.createElement(
			'section',
			{ className: 'contacts section-container' },
			React.createElement(
				'h2',
				{ className: 'contacts__title_content section__title' },
				'Contacts'
			),
			React.createElement(
				'div',
				{ className: 'contacts__content' },
				React.createElement(
					LazyLoad,
					null,
					React.createElement(HomeContacts, { settings: settings })
				)
			),
			React.createElement(
				'h2',
				{ className: 'contacts__title_map section__title' },
				'Map'
			),
			React.createElement(
				'div',
				{ className: 'contacts__map' },
				React.createElement(
					LazyLoad,
					null,
					React.createElement(MapYand, null)
				)
			)
		)
	);
};

IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default IndexContainer;