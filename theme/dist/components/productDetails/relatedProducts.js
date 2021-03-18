import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import GalleryProducts from '../products/gallery';

export default class RelatedProducts extends React.PureComponent {
	render() {
		const { ids, settings, addCartItem, limit } = this.props;
		if (ids && ids.length > 0) {
			let title = themeSettings.related_products_title && themeSettings.related_products_title.length > 0 ? themeSettings.related_products_title : text.relatedProducts;

			return React.createElement(
				'section',
				{ className: 'viewed_related viewed section-container' },
				React.createElement(
					'div',
					{ className: 'viewed__title section__title' },
					title
				),
				React.createElement(GalleryProducts, {
					ids: ids,
					settings: settings,
					addCartItem: addCartItem,
					limit: limit,
					isCentered: true
				})
			);
		}
		return null;
	}
}