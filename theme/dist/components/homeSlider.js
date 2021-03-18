import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import LazyLoad from 'react-lazyload';
import { themeSettings } from '../lib/settings';
import storeSettings from '../../../config/store';

const renderItem = item => React.createElement(
	'div',
	{ className: 'image-gallery-image' },
	React.createElement(
		LazyLoad,
		null,
		React.createElement(
			NavLink,
			{ to: item.path || '' },
			React.createElement(
				'div',
				{
					className: 'image-gallery__item',
					style: {
						color: themeSettings.home_slider_color || '#fff',
						backgroundImage: `url(${item.original})`
					}
				},
				React.createElement(
					'div',
					{ className: 'image-gallery__title' },
					item.title
				),
				React.createElement(
					'div',
					{ className: 'image-gallery__description' },
					item.description,
					item.description && item.description.length > 0 && React.createElement(
						'button',
						{
							type: 'button',
							className: 'image-gallery__button button button_gallery'
						},
						'Go'
					)
				)
			)
		)
	)
);

const HomeSlider = ({ images }) => {
	if (images && images.length > 0) {
		const items = images.map(item => ({
			original: `/assets/images/${item.image}`,
			title: item.title,
			description: item.description,
			path: item.path || '',
			button: item.button
		}));

		return React.createElement(
			'section',
			{ className: 'home-slider section-container' },
			React.createElement(ImageGallery, {
				items: items,
				lazyLoad: true,
				showThumbnails: false,
				slideInterval: 2000,
				showNav: themeSettings.home_gallery_shownav === true,
				showBullets: images.length > 1,
				showPlayButton: false,
				showFullscreenButton: false,
				slideOnThumbnailHover: false,
				renderItem: renderItem,
				infinite: false
			})
		);
	}
	return null;
};

HomeSlider.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({}))
};

HomeSlider.defaultProps = {
	images: null
};

export default HomeSlider;