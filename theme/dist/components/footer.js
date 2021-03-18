import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import storeSettings from '../../../config/store';

class FooterMenu extends React.Component {
	constructor(props) {
		super(props);

		this.isActiveToggle = () => {
			this.setState({
				isActive: !this.state.isActive
			});
		};

		this.state = {
			isActive: false
		};
	}

	render() {
		const { title, items } = this.props;
		let ulItems = null;

		if (items && items.length > 0) {
			ulItems = items.map((item, index) => React.createElement(
				'li',
				{ className: 'footer-menu__link', key: index },
				React.createElement(
					NavLink,
					{ to: item.url || '' },
					item.text
				)
			));
		}

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: `footer__title` },
				title
			),
			React.createElement(
				'ul',
				{ className: 'footer-menu' },
				ulItems
			)
		);
	}
}

const SocialIcons = ({ icons }) => {
	if (icons && icons.length > 0) {
		const items = icons.map((icon, index) => React.createElement('a', {
			key: index,
			href: icon.url || '',
			target: '_blank',
			rel: 'noopener',
			title: icon.type,
			className: icon.type
		}));
		return React.createElement(
			'div',
			{ className: 'social-icons' },
			items
		);
	}
	return null;
};

const Contacts = ({ contacts }) => {
	if (contacts && contacts.length > 0) {
		const items = contacts.map((item, index) => {
			const contact = item ? item.text : null;
			if (contact && contact.indexOf('@') > 0) {
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ href: `mailto:${contact}` },
						contact
					)
				);
			}
			if (contact && (contact.indexOf('+1') == 0 || contact.indexOf('1') == 0)) {
				let contactTel = contact;
				let re1 = new RegExp(/[-()\s/\\]/g);
				contactTel = contactTel.replace(re1, '');
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ className: 'footer-contacts__phone', href: `tel:${contactTel}` },
						contact
					)
				);
			}
			return React.createElement(
				'li',
				{ key: index },
				contact
			);
		});
		return React.createElement(
			'ul',
			{ className: 'footer-contacts' },
			items
		);
	}
	return null;
};

export default class Footer extends React.PureComponent {

	render() {
		const { settings } = this.props;
		const footerLogoUrl = settings.logo && settings.logo.length > 0 ? settings.logo : null;

		return React.createElement(
			'footer',
			{ className: 'footer' },
			React.createElement(
				'div',
				{ className: 'footer__contacts' },
				React.createElement(
					'div',
					{ className: 'footer__title' },
					'Contacts'
				),
				React.createElement(Contacts, { contacts: themeSettings.footer_contacts })
			),
			React.createElement(
				'div',
				{ className: 'footer__socials' },
				React.createElement(
					'div',
					{ className: 'footer__title' },
					'Social Networks'
				),
				React.createElement(SocialIcons, { icons: themeSettings.footer_social })
			),
			React.createElement(
				'div',
				{ className: 'footer__menu' },
				React.createElement(FooterMenu, {
					title: themeSettings.footer_menu_1_title,
					items: themeSettings.footer_menu_1_items
				})
			)
		);
	}
}
Footer.propTypes = {
	settings: PropTypes.shape({}).isRequired
};