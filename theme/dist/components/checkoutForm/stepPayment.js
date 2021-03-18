import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import PaymentForm from './paymentForm';

const CheckoutStepPayment = props => {
	const {
		cart,
		settings,
		processingCheckout,
		handleSuccessPayment,
		inputClassName,
		buttonClassName,
		shippingMethod,
		show,
		title,
		onCreateToken
	} = props;

	const { payment_method_gateway, grand_total } = cart;

	let total = grand_total;

	if (!show) {
		return React.createElement(
			'div',
			{ className: 'checkout__step step' },
			React.createElement(
				'div',
				{ className: 'step__num step__num_inactive' },
				'3'
			),
			React.createElement(
				'h2',
				{ className: 'step__title step__title_inactive' },
				title
			)
		);
	}
	return React.createElement(
		'div',
		{ className: 'checkout__step step' },
		React.createElement(
			'div',
			{ className: 'step__num' },
			'3'
		),
		React.createElement(
			'h2',
			{ className: 'step__title' },
			title
		),
		!processingCheckout && React.createElement(PaymentForm, {
			gateway: payment_method_gateway,
			amount: total,
			shopSettings: settings,
			shippingMethod: shippingMethod,
			onPayment: handleSuccessPayment,
			inputClassName: inputClassName,
			buttonClassName: buttonClassName,
			onCreateToken: onCreateToken
		}),
		processingCheckout && React.createElement(
			'p',
			null,
			text.loading
		)
	);
};

export default CheckoutStepPayment;