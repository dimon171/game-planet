import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const LoginIcon = () => {
	return React.createElement(
		'span',
		{ className: 'login-icon' },
		React.createElement('img', { src: '/assets/images/login.svg', alt: text.login, title: text.login })
	);
};

export default class Login extends React.PureComponent {
	render() {
		const { login, onClick, className } = this.props;

		return React.createElement(
			'span',
			{ className: className, onClick: onClick },
			React.createElement(LoginIcon, null),
			' ',
			text.login
		);
	}
}