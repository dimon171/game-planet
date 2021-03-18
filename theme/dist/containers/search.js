import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import PageBreadcrumbs from '../components/breadcrumbs';

const SearchContainer = props => {
	const {
		addCartItem,
		loadMoreProducts,
		state: { products, settings, productFilter, productsHasMore }
	} = props;
	const searchNotEmpty = productFilter.search && productFilter.search !== '';
	const searchDescription = searchNotEmpty ? `${text.resultsFor} "${productFilter.search}"` : text.search;
	const title = searchNotEmpty ? `${productFilter.search} - ${text.search}` : text.search;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, { title: title }),
		React.createElement(
			'section',
			{ className: 'main__header section-container' },
			React.createElement(PageBreadcrumbs, { page: text.search, path: '/search' }),
			React.createElement(
				'h1',
				{ className: 'main__title' },
				searchDescription
			)
		),
		React.createElement(
			'section',
			{ className: 'section-container search' },
			React.createElement(ProductList, {
				products: products,
				addCartItem: addCartItem,
				settings: settings,
				loadMoreProducts: loadMoreProducts,
				hasMore: productsHasMore
			})
		)
	);
};

SearchContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool
	}).isRequired
};

export default SearchContainer;