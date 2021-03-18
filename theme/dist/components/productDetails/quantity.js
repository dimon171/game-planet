import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';

export default class Quantity extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleChange = event => {
			this.setQuantity(event.target.value);
		};

		this.setQuantity = quantity => {
			let intQuantity = quantity;
			this.setState({
				quantity
			});
			if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
				intQuantity = parseInt(quantity);
				this.setState({ quantity: intQuantity });
				this.props.onChange(intQuantity);
			} else if (intQuantity > this.props.maxQuantity) {
				intQuantity = parseInt(this.props.maxQuantity);
				this.setState({ quantity: intQuantity });
				this.props.onChange(intQuantity);
			}
		};

		this.increment = () => {
			const newQuantity = this.state.quantity + 1;
			this.setQuantity(newQuantity);
		};

		this.decrement = () => {
			const newQuantity = this.state.quantity - 1;
			this.setQuantity(newQuantity);
		};

		this.state = {
			quantity: 1
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.quantity > nextProps.maxQuantity) {
			this.setQuantity(nextProps.maxQuantity);
		}
	}

	render() {
		const { maxQuantity } = this.props;
		const { quantity } = this.state;
		const disabled = maxQuantity === 0;
		const value = disabled ? 0 : quantity;

		return React.createElement(
			'div',
			{ className: 'product__quantity' },
			React.createElement(
				'div',
				{ className: 'product__title' },
				text.qty
			),
			React.createElement(
				'div',
				{ className: 'product-quantity' },
				React.createElement('button', {
					type: 'button',
					className: 'decrement',
					onClick: this.decrement
				}),
				React.createElement('input', {
					value: value,
					onChange: this.handleChange,
					maxLength: '3',
					type: 'number',
					pattern: '\\d*',
					disabled: disabled
				}),
				React.createElement('button', {
					type: 'button',
					className: 'increment',
					onClick: this.increment
				})
			)
		);
	}
}