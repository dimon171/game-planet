import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import PageBreadcrumbs from '../components/breadcrumbs';

const NotFoundContainer = () => React.createElement(
	Fragment,
	null,
	React.createElement(MetaTags, { title: text.title404 }),
	React.createElement(
		'section',
		{ className: 'main__header section-container' },
		React.createElement(PageBreadcrumbs, { page: text.title404, path: '/404' }),
		React.createElement(
			'h1',
			{ className: 'main__title' },
			text.title404
		),
		React.createElement(
			NavLink,
			{ to: '/' },
			text.text404
		)
	)
);

export default NotFoundContainer;