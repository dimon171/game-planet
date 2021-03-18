import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

export default class DiscountCountdown extends React.Component {
	constructor(props) {
		super(props);

		this.tick = () => {
			const dateNow = new Date();
			const dateTo = new Date(this.props.product.date_sale_to);
			const diff = Math.abs(Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000));

			this.setState({
				diff
			});
		};

		this.pad = num => num < 10 ? `0${num}` : num;

		this.state = {
			timer: null,
			diff: null
		};
	}

	componentDidMount() {
		let timer = setInterval(this.tick, 1000);
		this.setState({
			timer
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	render() {
		const { product } = this.props;
		const { diff } = this.state;

		if (product) {
			let days = Math.floor(diff / (24 * 60 * 60));
			let leftSec = diff - days * 24 * 60 * 60;

			let hrs = Math.floor(leftSec / (60 * 60));
			leftSec -= hrs * 60 * 60;

			let min = Math.floor(leftSec / 60);
			leftSec -= min * 60;

			return React.createElement(
				'div',
				{ className: 'product__discount discount-countdown' },
				React.createElement(
					'div',
					{ className: 'discount__title product__title' },
					text.saleEnds,
					':'
				),
				React.createElement(
					'div',
					{ className: 'discount__numbers' },
					React.createElement(
						'div',
						{ className: 'discount__numbers-item' },
						React.createElement(
							'div',
							{ className: 'discount__number' },
							this.pad(days)
						),
						React.createElement(
							'div',
							{ className: 'discount__label' },
							text.days
						)
					),
					React.createElement(
						'div',
						null,
						':'
					),
					React.createElement(
						'div',
						{ className: 'discount__numbers-item' },
						React.createElement(
							'div',
							{ className: 'discount__number' },
							this.pad(hrs)
						),
						React.createElement(
							'div',
							{ className: 'discount__label' },
							text.hours
						)
					),
					React.createElement(
						'div',
						null,
						':'
					),
					React.createElement(
						'div',
						{ className: 'discount__numbers-item' },
						React.createElement(
							'div',
							{ className: 'discount__number' },
							this.pad(min)
						),
						React.createElement(
							'div',
							{ className: 'discount__label' },
							text.minutes
						)
					)
				)
			);
		}
		return null;
	}
}