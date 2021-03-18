import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ItemPrice from './itemPrice';
import AddToCartButton from './addToCartButton';
// import Gallery from './gallery';
import Tags from './tags';

const Item = ({
	product,
	addCartItem,
	settings,

	selectedVariant,
	isAllOptionsSelected = false,
	quantity = 1
}) => {
	const addToCart = () => {
		const item = {
			product_id: product.id,
			quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}

		addCartItem(item);
	};

	const imageUrl = product && product.images && product.images.length > 0 ? product.images[0].url : '/assets/images/noimage.svg';

	return React.createElement(
		'div',
		{ className: 'products__item' },
		React.createElement(NavLink, { to: product.path, className: 'products__link' }),
		React.createElement(
			'div',
			{ className: 'image-gallery-slides' },
			React.createElement('div', {
				className: 'image-gallery-image',
				style: { backgroundImage: `url(${imageUrl})` }
			})
		),
		React.createElement(Tags, { tags: product.tags }),
		React.createElement(
			'div',
			{ className: 'content products__content' },
			React.createElement(
				'div',
				{ className: 'products__name' },
				React.createElement(
					NavLink,
					{ to: product.path },
					product.name
				)
			),
			React.createElement(ItemPrice, { product: product, settings: settings }),
			React.createElement(
				'div',
				{ className: 'products__button button-addtocart' },
				React.createElement(AddToCartButton, {
					product: product,
					variant: selectedVariant,
					addCartItem: addToCart,
					isAllOptionsSelected: isAllOptionsSelected
				})
			)
		)
	);
};

export default Item;