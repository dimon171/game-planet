import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class BannerAside extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return React.createElement(
			'div',
			{ className: 'banner-aside is-hidden-mobile' },
			React.createElement(
				NavLink,
				{ to: '' },
				React.createElement(
					'div',
					{ className: 'banner-aside__content' },
					React.createElement(
						'div',
						{ className: 'banner-aside__image' },
						React.createElement('img', {
							src: '/assets/images/banner_aside.jpg',
							srcSet: '/assets/images/banner_aside@2x.jpg 2x',
							alt: ''
						})
					),
					React.createElement(
						'div',
						{ className: 'banner-aside__text' },
						'Sale 10%'
					)
				)
			)
		);
	}
}

export default BannerAside;