import React from 'react';
import { themeSettings, text } from '../../lib/settings';

const Attribute = ({ name, value }) => React.createElement(
	'div',
	{ className: 'product-attribute' },
	React.createElement(
		'div',
		{ className: 'product-attribute__name' },
		name,
		':'
	),
	React.createElement(
		'div',
		{ className: 'product-attribute__value' },
		value
	)
);

const Attributes = ({ attributes }) => {
	if (attributes && attributes.length > 0) {
		const items = attributes.map((attribute, index) => React.createElement(Attribute, { key: index, name: attribute.name, value: attribute.value }));

		return React.createElement(
			'div',
			{ className: 'product__attributes' },
			React.createElement(
				'div',
				{ className: 'product__title' },
				text.attributes
			),
			items
		);
	}
	return null;
};
export default Attributes;