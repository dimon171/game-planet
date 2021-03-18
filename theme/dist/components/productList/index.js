import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import Item from './item';
import LoadMore from './loadMore';

const ProductList = ({
	products,
	addCartItem,
	settings,
	loadMoreProducts,
	hasMore,
	loadingProducts,
	loadingMoreProducts,
	className = 'products products_list'
}) => {
	const items = products ? products.map(product => React.createElement(Item, {
		key: product.id,
		product: product,
		addCartItem: addCartItem,
		settings: settings
	})) : null;

	return React.createElement(
		Fragment,
		null,
		React.createElement(
			'div',
			{ className: className + (loadingProducts ? ' loading' : '') },
			items
		),
		React.createElement(
			'div',
			{ className: 'load-more' },
			React.createElement(LoadMore, {
				loadMoreProducts: loadMoreProducts,
				hasMore: hasMore,
				loading: loadingMoreProducts
			})
		)
	);
};

export default ProductList;