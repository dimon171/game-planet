import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const Item = ({ category }) => {
	const imageHeight = themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0 ? themeSettings.list_image_max_height : 'auto';
	const placeholderHeight = themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0 ? themeSettings.list_image_max_height : 200;

	return React.createElement(
		'div',
		{ className: 'categories-gallery__item' },
		React.createElement(
			NavLink,
			{ to: category.path },
			React.createElement('div', {
				className: 'categories-gallery__image',
				style: {
					backgroundImage: `url(${category.image || '/assets/images/noimage.svg'})`
				}
			}),
			React.createElement(
				'div',
				{ className: 'categories-gallery__name' },
				category.name
			)
		)
	);
};

export default Item;