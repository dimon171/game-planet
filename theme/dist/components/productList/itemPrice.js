import React from 'react';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

const ItemPrice = ({ product, settings }) => {
	const priceStyle = {};
	if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
		priceStyle.fontSize = `${themeSettings.list_price_size}px`;
	}
	if (themeSettings.list_price_color && themeSettings.list_price_color.length > 0) {
		priceStyle.color = themeSettings.list_price_color;
	}

	if (product.stock_status === 'discontinued') {
		return React.createElement(
			'div',
			{ className: 'product-price' },
			text.discontinued
		);
	}
	if (product.stock_status === 'out_of_stock') {
		return React.createElement(
			'div',
			{ className: 'product-price' },
			text.outOfStock
		);
	}

	let { price } = product;

	if (Lscache.get('auth_data')) {
		price *= 0.7;
	}

	if (product.on_sale || Lscache.get('auth_data')) {
		return React.createElement(
			'div',
			{ className: 'products__price' },
			React.createElement(
				'del',
				{ className: 'products__price_old product-old-price' },
				React.createElement(FormattedCurrency, {
					settings: settings,
					number: product.regular_price
				})
			),
			React.createElement(
				'span',
				{ className: 'products__price_new product-new-price' },
				React.createElement(FormattedCurrency, { settings: settings, number: price })
			)
		);
	}
	return React.createElement(
		'div',
		{ className: 'products__price', style: priceStyle },
		React.createElement(FormattedCurrency, { settings: settings, number: price })
	);
};

export default ItemPrice;