import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const SummaryItem = ({ settings, item, updateCartItemQuantiry }) => {
	const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);
	const qtyOptions = [];
	const maxQty = item.stock_backorder ? themeSettings.maxCartItemQty : item.stock_quantity >= themeSettings.maxCartItemQty ? themeSettings.maxCartItemQty : item.stock_quantity;

	for (let i = 0; i <= maxQty; i++) {
		const optionText = i === 0 ? text.remove : i;
		qtyOptions.push(React.createElement(
			'option',
			{ key: i, value: i },
			optionText
		));
	}

	let price = item.price_total;

	return React.createElement(
		'div',
		{ className: 'cart__item cart-item cart-item_checkout' },
		React.createElement(
			'div',
			{ className: 'cart-item__details' },
			React.createElement(
				'div',
				{ className: 'cart-item__image' },
				React.createElement(
					NavLink,
					{ to: item.path },
					React.createElement('div', {
						className: 'cart-item__img',
						style: { backgroundImage: `url(${thumbnail})` }
					})
				)
			),
			React.createElement(
				'div',
				{ className: 'cart-item__name' },
				React.createElement(
					NavLink,
					{ to: item.path },
					item.name
				)
			),
			React.createElement(
				'div',
				{ className: 'cart-item__options cart-options' },
				item.variant_name.length > 0 && React.createElement(
					'div',
					{ className: 'cart-options__name' },
					item.variant_name
				),
				React.createElement(
					'div',
					{ className: 'qty cart-options__name' },
					React.createElement(
						'span',
						{ className: 'cart-options__name_qty' },
						text.qty,
						':'
					),
					React.createElement(
						'span',
						{ className: 'select cart-options__select' },
						React.createElement(
							'select',
							{
								onChange: e => {
									updateCartItemQuantiry(item.id, e.target.value);
								},
								value: item.quantity
							},
							qtyOptions
						)
					)
				)
			)
		),
		React.createElement(
			'div',
			{ className: 'cart-item__functions' },
			React.createElement(
				'div',
				{ className: 'cart-item__price' },
				helper.formatCurrency(price, settings)
			)
		)
	);
};

SummaryItem.propTypes = {
	settings: PropTypes.shape({}).isRequired,
	item: PropTypes.shape({}).isRequired,
	updateCartItemQuantiry: PropTypes.func.isRequired
};

const OrderSummary = props => {
	const {
		updateCartItemQuantiry,
		state: { cart, settings }
	} = props;

	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(item => React.createElement(SummaryItem, {
			key: item.id,
			item: item,
			updateCartItemQuantiry: updateCartItemQuantiry,
			settings: settings
		}));

		let subtotal = cart.grand_total;
		let grand_total = cart.grand_total;

		return React.createElement(
			Fragment,
			null,
			React.createElement(
				'div',
				{ className: 'cart__title cart__title_checkout' },
				text.orderSummary
			),
			items,
			React.createElement(
				'div',
				{ className: 'cart__summary summary' },
				React.createElement(
					'div',
					{ className: 'summary__row' },
					cart.tax_total > 0 && cart.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__col' },
						text.included_tax
					),
					cart.tax_total > 0 && cart.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(cart.tax_total, settings)
					)
				),
				React.createElement(
					'div',
					{ className: 'summary__row' },
					React.createElement(
						'div',
						{ className: 'summary__col' },
						text.subtotal
					),
					React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(subtotal, settings)
					)
				),
				React.createElement(
					'div',
					{ className: 'summary__row' },
					React.createElement(
						'div',
						{ className: 'summary__col' },
						text.shipping
					),
					React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(cart.shipping_total, settings)
					)
				),
				React.createElement(
					'div',
					{ className: 'summary__row' },
					cart.discount_total > 0 && React.createElement(
						'div',
						{ className: 'summary__col' },
						text.discount
					),
					cart.discount_total > 0 && React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(cart.discount_total, settings)
					)
				),
				React.createElement(
					'div',
					{ className: 'summary__row' },
					cart.tax_total > 0 && !cart.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__col' },
						text.tax
					),
					cart.tax_total > 0 && !cart.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(cart.tax_total, settings)
					)
				),
				React.createElement(
					'div',
					{ className: 'summary__row' },
					React.createElement(
						'div',
						{ className: 'summary__col' },
						text.grandTotal
					),
					React.createElement(
						'div',
						{ className: 'summary__col summary__col_price' },
						helper.formatCurrency(grand_total, settings)
					)
				)
			)
		);
	}
	return null;
};

OrderSummary.propTypes = {
	updateCartItemQuantiry: PropTypes.func.isRequired,
	state: PropTypes.shape({
		cart: PropTypes.shape({}),
		settings: PropTypes.shape({}).isRequired
	}).isRequired
};

export default OrderSummary;