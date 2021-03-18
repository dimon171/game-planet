import React from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const AddToCartButton = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	const buttonStyle = {};
	if (themeSettings.button_addtocart_bg && themeSettings.button_addtocart_bg.length > 0) {
		buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
	}
	if (themeSettings.button_addtocart_color && themeSettings.button_addtocart_color.length > 0) {
		buttonStyle.color = themeSettings.button_addtocart_color;
	}

	let seeMoreText = 'Details';

	const addToCartText = themeSettings.button_addtocart_text && themeSettings.button_addtocart_text.length > 0 ? themeSettings.button_addtocart_text : text.addToCart;

	if (product.stock_status === 'discontinued') {
		return React.createElement(
			'button',
			{
				type: 'button',
				className: 'button is-dark is-fullwidth',
				style: buttonStyle,
				disabled: true
			},
			' ',
			text.discontinued,
			' '
		);
	}
	if (product.variants) {
		return React.createElement(
			NavLink,
			{ to: product.path,
				className: 'button is-success is-fullwidth',
				style: buttonStyle
			},
			seeMoreText
		);
	}
	if (product.variable && !isAllOptionsSelected) {
		return React.createElement(
			'button',
			{
				type: 'button',
				className: 'button is-success is-fullwidth',
				style: buttonStyle,
				disabled: true
			},
			' ',
			text.optionsRequired,
			' '
		);
	}
	if (product.variable && !product.stock_backorder) {
		return React.createElement(
			'button',
			{
				type: 'button',
				className: 'button is-success is-fullwidth',
				style: buttonStyle,
				disabled: true
			},
			' ',
			text.outOfStock,
			' '
		);
	}
	if (product.stock_status === 'available') {
		return React.createElement(
			'button',
			{
				type: 'button',
				className: 'button is-success is-fullwidth',
				style: buttonStyle,
				onClick: addCartItem
			},
			' ',
			addToCartText,
			' '
		);
	}
	if (product.stock_status === 'out_of_stock') {
		return React.createElement(
			'button',
			{
				type: 'button',
				className: 'button is-success is-fullwidth',
				style: buttonStyle,
				disabled: true
			},
			' ',
			text.outOfStock,
			' '
		);
	}
	return null;
};

export default AddToCartButton;