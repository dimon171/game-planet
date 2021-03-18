import React from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const Option = ({ option, onChange }) => {
	const values = option.values.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).map((value, index) => React.createElement(
		'option',
		{ key: index, value: value.id },
		value.name
	));

	const notSelectedTitle = `${text.selectOption} ${option.name}`;

	return React.createElement(
		'div',
		{ className: 'product-option' },
		React.createElement(
			'div',
			{ className: 'product__title product-option__name' },
			option.name
		),
		React.createElement(
			'span',
			{ className: 'product-option__select select is-fullwidth' },
			React.createElement(
				'select',
				{
					onChange: e => {
						onChange(option.id, e.target.value);
					}
				},
				React.createElement(
					'option',
					{ value: '' },
					notSelectedTitle
				),
				values
			)
		)
	);
};

const Options = ({ options, onChange }) => {
	if (options && options.length > 0) {
		const items = options.map((option, index) => React.createElement(Option, { key: index, option: option, onChange: onChange }));

		return React.createElement(
			'div',
			{ className: 'product__options' },
			items
		);
	}
	return null;
};
export default Options;