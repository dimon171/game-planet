import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

import Sort from '../sort';
import PriceSlider from './priceSlider';
import AttributeFilter from './attributeFilter';

export default class ProductFilter extends React.Component {
	constructor(props) {
		super(props);

		this.sidebarToggle = () => {
			this.setState({
				sidebarIsActive: !this.state.sidebarIsActive
			});
			document.body.classList.toggle('noscroll');
		};

		this.sidebarClose = () => {
			this.setState({ sidebarIsActive: false });
			document.body.classList.remove('noscroll');
		};

		this.state = {
			sidebarIsActive: false
		};
	}

	render() {
		const { sidebarIsActive } = this.state;
		const {
			categoryDetails,
			categories,
			settings,
			productFilter,
			productsMinPrice,
			productsMaxPrice,
			productsAttributes
		} = this.props.state;

		return React.createElement(
			Fragment,
			null,
			React.createElement(
				'div',
				{ className: 'category__sort sort' },
				React.createElement(Sort, {
					defaultSort: settings.default_product_sorting,
					currentSort: productFilter.sort,
					setSort: this.props.setSort
				}),
				React.createElement(
					'button',
					{
						type: 'button',
						className: 'filter__button button button_filter is-hidden-tablet',
						onClick: this.sidebarToggle
					},
					text.filterProducts
				)
			),
			React.createElement(
				'div',
				{ className: 'category__filter ' },
				React.createElement(
					'div',
					{ className: sidebarIsActive ? 'filter filter-open' : 'filter' },
					React.createElement(
						'button',
						{
							type: 'button',
							className: 'modal-close is-hidden-tablet',
							onClick: this.sidebarClose
						},
						React.createElement(
							'svg',
							{ className: 'icon', width: '28' },
							React.createElement('use', { xlinkHref: '#close' })
						)
					),
					React.createElement(
						'h2',
						{ className: 'filter__title is-hidden-tablet' },
						'Filter'
					),
					React.createElement(AttributeFilter, {
						attributes: productsAttributes,
						setFilterAttribute: this.props.setFilterAttribute,
						unsetFilterAttribute: this.props.unsetFilterAttribute
					}),
					React.createElement(PriceSlider, {
						minPrice: productsMinPrice,
						maxPrice: productsMaxPrice,
						minValue: productFilter.priceFrom,
						maxValue: productFilter.priceTo,
						setPriceFromAndTo: this.props.setPriceFromAndTo,
						settings: settings
					}),
					React.createElement(
						'button',
						{
							type: 'button',
							className: 'filter__submit button is-hidden-tablet',
							onClick: this.sidebarClose
						},
						'Apply'
					)
				)
			)
		);
	}
}