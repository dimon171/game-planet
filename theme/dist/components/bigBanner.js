import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class BigBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return React.createElement(
			NavLink,
			{ to: '' },
			React.createElement(
				'div',
				{ className: 'big-banner__content' },
				React.createElement(
					'div',
					{ className: 'big-banner__image' },
					React.createElement(
						'picture',
						null,
						React.createElement('source', {
							media: '(min-width: 769px)',
							sizes: '(min-width: 769px) 1170px',
							srcSet: '/assets/images/bigbanner.jpg, /assets/images/bigbanner@2x.jpg 2x'
						}),
						React.createElement('img', { src: '/assets/images/bigbanner.jpg', alt: 'Banner' })
					)
				),
				React.createElement(
					'div',
					{ className: 'big-banner__text' },
					'Join our community at cezerin.org',
					React.createElement(
						'button',
						{
							type: 'button',
							className: 'big-banner__button button button_gallery'
						},
						'Go'
					)
				)
			)
		);
	}
}

export default BigBanner;