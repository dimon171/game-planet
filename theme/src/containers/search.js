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
	const searchDescription = searchNotEmpty
		? `${text.resultsFor} "${productFilter.search}"`
		: text.search;
	const title = searchNotEmpty
		? `${productFilter.search} - ${text.search}`
		: text.search;

	return (
		<Fragment>
			<MetaTags title={title} />

			<section className="main__header section-container">
			<PageBreadcrumbs page={text.search} path="/search" />
				<h1 className="main__title">{searchDescription}</h1>
			</section>

			<section className="section-container search">
				<ProductList
					products={products}
					addCartItem={addCartItem}
					settings={settings}
					loadMoreProducts={loadMoreProducts}
					hasMore={productsHasMore}
				/>
			</section>
		</Fragment>
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
