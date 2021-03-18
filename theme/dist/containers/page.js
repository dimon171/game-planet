import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import PageList from '../components/pageList';
import PageBreadcrumbs from '../components/breadcrumbs';

const PageContainer = props => {
	const {
		state: { pageDetails }
	} = props;
	const pageListTag = themeSettings.page_list_tag;
	const pageListTagDefined = pageListTag && pageListTag.length > 0;
	const pageListPath = pageListTagDefined ? `/${pageListTag}` : null;
	const showPageList = pageListTagDefined && pageDetails.path === pageListPath;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogType: 'article',
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
				{ className: 'main__title' },
				pageDetails.meta_title
			)
		),
		React.createElement(
			'section',
			{ className: 'section-container page' },
			React.createElement('div', {
				className: 'page__content',
				dangerouslySetInnerHTML: {
					__html: pageDetails.content
				}
			}),
			showPageList && React.createElement(PageList, { tags: pageListTag, sort: '-date_created' })
		)
	);
};

PageContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default PageContainer;