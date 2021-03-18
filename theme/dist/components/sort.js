import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => React.createElement(
	'div',
	{ className: 'sort__select select' },
	React.createElement(
		'select',
		{
			onChange: e => {
				setSort(e.target.value);
			},
			value: currentSort
		},
		React.createElement(
			'option',
			{ value: defaultSort },
			text.sortFavorite
		),
		React.createElement(
			'option',
			{ value: themeSettings.sortNewest },
			text.sortNewest
		),
		React.createElement(
			'option',
			{ value: themeSettings.sortPriceLow },
			text.sortPriceLow
		),
		React.createElement(
			'option',
			{ value: themeSettings.sortPriceHigh },
			text.sortPriceHigh
		)
	)
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired
};

export default Sort;