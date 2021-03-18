import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MetaTags from '../components/metaTags';
import OrderSummary from '../components/orderSummary';
import CheckoutForm from '../components/checkoutForm';
import PageBreadcrumbs from '../components/breadcrumbs';

const CheckoutContainer = props => {
	const {
		state: { pageDetails }
	} = props;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		React.createElement(
			'section',
			{ className: 'main__header section-container' },
			React.createElement(PageBreadcrumbs, {
				page: pageDetails.meta_title,
				path: pageDetails.path
			}),
			React.createElement(
				'h1',
				{ className: 'main__title checkout__title' },
				'Checkout'
			)
		),
		React.createElement(
			'section',
			{ className: 'checkout section-container' },
			React.createElement(
				'div',
				{ className: 'checkout__form checkout-form' },
				React.createElement(CheckoutForm, props)
			),
			React.createElement(
				'div',
				{ className: 'checkout__order checkout-order' },
				React.createElement(OrderSummary, props)
			)
		)
	);
};

CheckoutContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default CheckoutContainer;