import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { themeSettings } from '../lib/settings';
import { deliveryData } from '../../locales/deliveryData';

class HomeContacts extends Component {
	constructor(props) {
		super(props);

		this.onTownChange = event => {
			this.setState({
				townId: event.target.value
			});
		};

		this.state = {
			townId: 0
		};
	}

	render() {
		const {
			props: { delivery = deliveryData, settings }
		} = this;

		return React.createElement(
			Fragment,
			null,
			React.createElement(
				'div',
				{ className: 'contacts-company' },
				React.createElement(
					'div',
					{ className: 'contacts-company__address' },
					themeSettings.footer_contacts[0].text,
					',',
					' ',
					themeSettings.footer_contacts[1].text
				),
				React.createElement(
					'div',
					{ className: 'contacts-company__worktime contacts-worktime' },
					React.createElement(
						'h3',
						{ className: 'contacts-worktime__title' },
						'Hours'
					),
					React.createElement(
						'div',
						{ className: 'contacts-worktime__table' },
						React.createElement(
							'div',
							{ className: 'contacts-worktime__row' },
							React.createElement(
								'div',
								{ className: 'contacts-worktime__col' },
								'Monday-Saturday:'
							),
							React.createElement(
								'div',
								{ className: 'contacts-worktime__col' },
								'08:00-19:00'
							)
						),
						React.createElement(
							'div',
							{ className: 'contacts-worktime__row' },
							React.createElement(
								'div',
								{ className: 'contacts-worktime__col' },
								'Sunday:'
							),
							React.createElement(
								'div',
								{ className: 'contacts-worktime__col' },
								'09:00-17:00'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'contacts-company__call' },
						React.createElement(
							'div',
							{ className: 'contacts-company__phone' },
							'+1 (000) 000-00-00'
						),
						React.createElement(
							'a',
							{
								href: 'tel:+10000000000',
								className: 'contacts-company__button button button_call'
							},
							'Make Call'
						)
					)
				)
			)
		);
	}
}

export default HomeContacts;