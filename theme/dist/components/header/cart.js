import React, { Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const CartItem = ({ item, deleteCartItem, settings }) => {
	const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);

	let price = item.price_total;

	return React.createElement(
		'div',
		{ className: 'cart__item cart-item' },
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
					{ className: 'cart-options__name' },
					text.qty,
					': ',
					item.quantity
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
			),
			React.createElement(
				'a',
				{
					className: 'cart-item__button button button_light button_cart-delete',
					onClick: () => deleteCartItem(item.id)
				},
				text.remove
			)
		)
	);
};

export default class Cart extends React.PureComponent {
	render() {
		const { cart, deleteCartItem, settings, cartToggle } = this.props;

		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => React.createElement(CartItem, {
				key: item.id,
				item: item,
				deleteCartItem: deleteCartItem,
				settings: settings
			}));

			return React.createElement(
				Fragment,
				null,
				React.createElement(
					'div',
					{ className: 'cart__title' },
					text.orderSummary
				),
				items,
				React.createElement(
					NavLink,
					{
						className: 'cart__button button button_cart',
						to: {
							pathname: '/checkout',
							state: { cartLayer: true }
						},
						onClick: cartToggle
					},
					text.proceedToCheckout
				)
			);
		}
		return React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				text.cartEmpty
			)
		);
	}
}