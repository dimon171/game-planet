import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const getCheckoutField = (checkoutFields, fieldName) => {
	if (checkoutFields && checkoutFields.length > 0) {
		return checkoutFields.find(f => f.name === fieldName && f.status !== 'hidden');
	}
	return null;
};

const MobileField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'mobile');
	return checkoutField && order.mobile !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.mobile
	}) : null;
};

const CityField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'city');
	return checkoutField && order.shipping_address.city !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.shipping_address.city
	}) : null;
};

const CommentsField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'comments');
	return checkoutField && order.comments !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.comments
	}) : null;
};

const ShippingFields = ({ order, shippingMethod }) => {
	let shippingFields = null;
	if (shippingMethod) {
		shippingFields = Object.keys(order.shipping_address).map((key, i) => {
			const fieldLabel = helper.getShippingFieldLabelOrderSuccess(key);
			const fieldValue = order.shipping_address[key];

			if (key.indexOf('coordinates') === -1 && fieldValue !== '' && fieldLabel !== '') {
				return React.createElement(ShippingFieldDiv, { key: i, label: fieldLabel, value: fieldValue });
			}
		});
	}

	return React.createElement(
		'div',
		null,
		shippingFields
	);
};

const ShippingFieldDiv = ({ label, value }) => React.createElement(
	'div',
	{ className: 'shipping-field delivery__row' },
	React.createElement(
		'div',
		{ className: 'delivery__col' },
		label
	),
	React.createElement(
		'div',
		{ className: 'delivery__col delivery__col_value' },
		value
	)
);

const OrderItem = ({ item, settings }) => {
	const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);
	return React.createElement(
		'div',
		{ className: 'order__item' },
		React.createElement(
			'div',
			{ className: 'order__col' },
			React.createElement(
				'div',
				{ className: 'order__value order__value_product cart-item' },
				React.createElement(
					'div',
					{ className: 'cart-item__details cart-item__details_order' },
					React.createElement('div', {
						className: 'cart-item__img',
						style: { backgroundImage: `url(${thumbnail})` }
					}),
					React.createElement(
						'div',
						{ className: 'cart-item__name' },
						item.name,
						React.createElement(
							'div',
							{ className: 'cart-item__options cart-options' },
							item.variant_name.length > 0 && React.createElement(
								'div',
								{ className: 'cart-options__name' },
								item.variant_name
							)
						)
					)
				)
			)
		),
		React.createElement(
			'div',
			{ className: 'order__col' },
			React.createElement(
				'div',
				{ className: 'order__option' },
				text.qty
			),
			React.createElement(
				'div',
				{ className: 'order__value' },
				item.quantity
			)
		),
		React.createElement(
			'div',
			{ className: 'order__col' },
			React.createElement(
				'div',
				{ className: 'order__option' },
				text.price
			),
			React.createElement(
				'div',
				{ className: 'order__value' },
				helper.formatCurrency(item.price, settings)
			)
		),
		React.createElement(
			'div',
			{ className: 'order__col' },
			React.createElement(
				'div',
				{ className: 'order__option' },
				text.total
			),
			React.createElement(
				'div',
				{ className: 'order__value' },
				helper.formatCurrency(item.price_total, settings)
			)
		)
	);
};

const OrderItems = ({ items, settings }) => {
	if (items && items.length > 0) {
		const rows = items.map(item => React.createElement(OrderItem, { key: item.id, item: item, settings: settings }));
		return React.createElement(
			'div',
			{ className: 'order__body' },
			rows
		);
	}
	return null;
};

const CheckoutSuccess = ({
	order,
	settings,
	pageDetails,
	shippingMethod,
	checkoutFields
}) => {
	if (order && order.items && order.items.length > 0) {
		return React.createElement(
			Fragment,
			null,
			React.createElement(
				'section',
				{ className: 'section-container main__header' },
				React.createElement(
					'h1',
					{ className: 'main__title' },
					text.checkoutSuccessTitle
				),
				React.createElement('div', {
					dangerouslySetInnerHTML: {
						__html: pageDetails.content
					}
				})
			),
			React.createElement(
				'section',
				{ className: 'section-container checkout-success' },
				React.createElement(
					'div',
					{ className: 'checkout-success__delivery delivery' },
					React.createElement(
						'h2',
						{ className: 'delivery__title' },
						text.shipping
					),
					React.createElement(
						'div',
						{ className: 'delivery__table' },
						React.createElement(MobileField, { order: order, checkoutFields: checkoutFields }),
						React.createElement(CityField, { order: order, checkoutFields: checkoutFields }),
						React.createElement(ShippingFields, { order: order, shippingMethod: shippingMethod }),
						React.createElement(CommentsField, { order: order, checkoutFields: checkoutFields })
					),
					React.createElement(
						'div',
						{ className: 'delivery__table' },
						React.createElement(
							'div',
							{ className: 'delivery__row' },
							React.createElement(
								'div',
								{ className: 'delivery__col' },
								text.orderNumber,
								': '
							),
							React.createElement(
								'div',
								{ className: 'delivery__col delivery__col_value' },
								order.number
							)
						),
						React.createElement(
							'div',
							{ className: 'delivery__row' },
							React.createElement(
								'div',
								{ className: 'delivery__col' },
								text.shippingMethod,
								': '
							),
							React.createElement(
								'div',
								{ className: 'delivery__col delivery__col_value' },
								order.shipping_method
							)
						),
						React.createElement(
							'div',
							{ className: 'delivery__row' },
							React.createElement(
								'div',
								{ className: 'delivery__col' },
								text.paymentMethod,
								': '
							),
							React.createElement(
								'div',
								{ className: 'delivery__col delivery__col_value' },
								order.payment_method
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'checkout-success__order order' },
					React.createElement(
						'div',
						{ className: 'order__table' },
						React.createElement(
							'div',
							{ className: 'order__header' },
							React.createElement(
								'div',
								{ className: 'order__col' },
								text.productName
							),
							React.createElement(
								'div',
								{ className: 'order__col' },
								text.qty
							),
							React.createElement(
								'div',
								{ className: 'order__col' },
								text.price
							),
							React.createElement(
								'div',
								{ className: 'order__col' },
								text.total
							)
						),
						React.createElement(OrderItems, { items: order.items, settings: settings })
					)
				),
				React.createElement(
					'div',
					{ className: 'summary summary_order' },
					order.tax_total > 0 && order.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__row' },
						React.createElement(
							'div',
							{ className: 'summary__col' },
							text.included_tax,
							':'
						),
						React.createElement(
							'div',
							{ className: 'summary__col summary__col_price' },
							helper.formatCurrency(order.tax_total, settings)
						)
					),
					React.createElement(
						'div',
						{ className: 'summary__row' },
						React.createElement(
							'div',
							{ className: 'summary__col' },
							text.subtotal,
							':'
						),
						React.createElement(
							'div',
							{ className: 'summary__col summary__col_price' },
							helper.formatCurrency(order.subtotal, settings)
						)
					),
					React.createElement(
						'div',
						{ className: 'summary__row' },
						React.createElement(
							'div',
							{ className: 'summary__col' },
							text.shipping,
							':'
						),
						React.createElement(
							'div',
							{ className: 'summary__col summary__col_price' },
							helper.formatCurrency(order.shipping_total, settings)
						)
					),
					order.tax_total > 0 && !order.item_tax_included && React.createElement(
						'div',
						{ className: 'summary__row' },
						React.createElement(
							'div',
							{ className: 'summary__col' },
							text.tax,
							':'
						),
						React.createElement(
							'div',
							{ className: 'summary__col summary__col_price' },
							helper.formatCurrency(order.tax_total, settings)
						)
					),
					React.createElement(
						'div',
						{ className: 'summary__row' },
						React.createElement(
							'div',
							{ className: 'summary__col' },
							text.grandTotal,
							':'
						),
						React.createElement(
							'div',
							{ className: 'summary__col summary__col_price' },
							helper.formatCurrency(order.grand_total, settings)
						)
					)
				)
			)
		);
	}
	return React.createElement(
		'div',
		{ className: 'has-text-centered' },
		text.cartEmpty
	);
};

CheckoutSuccess.propTypes = {
	order: PropTypes.shape({}),
	settings: PropTypes.shape({}).isRequired,
	pageDetails: PropTypes.shape({}).isRequired,
	shippingMethod: PropTypes.shape({}).isRequired,
	checkoutFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

CheckoutSuccess.defaultProps = {
	order: null
};

export default CheckoutSuccess;