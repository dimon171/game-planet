import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import Cart from './cart';
import CartIndicator from './cartIndicator';
import SearchBox from './searchBox';
import HeadMenu from './headMenu';

class HeaderBottomMenu extends React.Component {
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
				{ className: 'navigation-menu__item', key: index },
				React.createElement(
					NavLink,
					{ to: item.url || '' },
					item.text
				)
			));
		}

		return React.createElement(
			'ul',
			{ className: 'navigation-menu__list' },
			ulItems
		);
	}
}

const Logo = ({ src, onClick, alt }) => React.createElement(
	NavLink,
	{ className: 'logo-image', to: '/', onClick: onClick },
	React.createElement('img', { src: src, alt: alt })
);

const BurgerButton = ({ onClick, className }) => React.createElement(
	'span',
	{ className: className, onClick: onClick },
	React.createElement('span', null),
	React.createElement('span', null),
	React.createElement('span', null)
);

const BackButton = ({ onClick }) => React.createElement(
	'span',
	{
		className: 'navbar-item is-hidden-tablet is-flex-mobile',
		onClick: onClick
	},
	React.createElement('img', { className: 'icon', src: '/assets/images/arrow_back.svg' })
);

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.handleScroll = event => {
			const scrollTop = window.scrollY;
			const isScrolled = scrollTop > 0;

			this.setState({
				isScrolled
			});
		};

		this.menuToggle = () => {
			this.setState({
				mobileMenuIsActive: !this.state.mobileMenuIsActive,
				cartIsActive: false,
				mobileCatalogIsActive: false
			});
			document.body.classList.toggle('noscroll');
		};

		this.catalogToggle = () => {
			this.setState({
				mobileCatalogIsActive: !this.state.mobileCatalogIsActive,
				cartIsActive: false,
				mobileMenuIsActive: false
			});
			document.body.classList.toggle('noscroll');
		};

		this.searchToggle = () => {
			this.setState({
				mobileSearchIsActive: !this.state.mobileSearchIsActive
			});
			document.body.classList.toggle('search-active');
		};

		this.menuClose = () => {
			this.setState({ mobileMenuIsActive: false });
			document.body.classList.remove('noscroll');
		};

		this.catalogClose = () => {
			this.setState({ mobileCatalogIsActive: false });
			document.body.classList.remove('noscroll');
		};

		this.closeAll = () => {
			this.setState({
				cartIsActive: false,
				mobileMenuIsActive: false
			});
			document.body.classList.remove('noscroll');
		};

		this.cartToggle = () => {
			this.setState({
				cartIsActive: !this.state.cartIsActive,
				mobileMenuIsActive: false
			});

			if (this.props.state.cart && this.props.state.cart.items && this.props.state.cart.items.length > 0) {
				this.props.cartLayerInitialized({
					cartlayerBtnInitialized: true
				});
			}
			document.body.classList.remove('noscroll');
		};

		this.showCart = () => {
			this.setState({
				cartIsActive: true,
				mobileMenuIsActive: false
			});
			document.body.classList.add('noscroll');
		};

		this.handleLogin = () => {
			Lscache.flushExpired();
			if (Lscache.get('auth_data') === null) {
				this.props.loggedinUserTimeUp({
					authenticated: false
				});
				this.props.setLocation('/login');
			} else {
				this.props.customerData({
					token: Lscache.get('auth_data'),
					authenticated: true
				});
				this.props.setLocation('/customer-account');
			}
			this.closeAll();
		};

		this.handleSearch = search => {
			if (this.props.state.currentPage.path === '/search') {
				this.props.setSearch(search);
			} else if (search && search !== '') {
				this.props.setLocation(`/search?search=${search}`);
			}
		};

		this.handleGoBack = () => {
			this.closeAll();
			this.props.goBack();
		};

		this.state = {
			mobileMenuIsActive: false,
			mobileSearchIsActive: false,
			mobileCatalogIsActive: false,
			cartIsActive: false,
			isScrolled: false
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.state.cart !== nextProps.state.cart && this.props.state.currentPage.path !== '/checkout') {
			this.showCart();
		}
	}

	componentWillUnmountn() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		const {
			categories,
			cart,
			settings,
			currentPage,
			location,
			productFilter,
			cartlayerBtnInitialized
		} = this.props.state;

		const classToggle = this.state.mobileMenuIsActive ? 'navbar-burger is-hidden-tablet is-active' : 'navbar-burger is-hidden-tablet';
		const showBackButton = currentPage.type === 'product' && location.hasHistory;

		return React.createElement(
			Fragment,
			null,
			React.createElement(
				'div',
				{ style: { display: 'none' } },
				React.createElement(
					'svg',
					{
						id: 'close',
						xmlns: 'http://www.w3.org/2000/svg',
						viewBox: '0 0 371.23 371.23'
					},
					React.createElement('path', { d: 'M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0 21.213l164.402 164.402L0 350.018l21.213 21.212 164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z' })
				)
			),
			React.createElement(
				'header',
				{
					className: this.state.isScrolled ? 'header header_scrolled' : 'header'
				},
				React.createElement(
					'div',
					{ className: 'header__top' },
					React.createElement(
						'div',
						{ className: 'header__logo logo' },
						React.createElement(Logo, { src: settings.logo, onClick: this.closeAll, alt: 'logo' })
					),
					React.createElement(
						'div',
						{ className: 'header__contacts header-contacts is-hidden-mobile' },
						React.createElement(
							'div',
							{ className: 'header-contacts__item' },
							React.createElement(
								'span',
								{ className: 'header-contacts__icon header-contacts__icon_address' },
								React.createElement('img', { src: '/assets/images/icons/pin.svg', alt: '', title: '' })
							),
							themeSettings.footer_contacts[0].text,
							',',
							' ',
							themeSettings.footer_contacts[1].text
						),
						React.createElement(
							'div',
							{ className: 'header-contacts__item' },
							React.createElement(
								'span',
								{ className: 'header-contacts__icon header-contacts__icon_time' },
								React.createElement('img', { src: '/assets/images/icons/clocks.svg', alt: '', title: '' })
							),
							'10:00 \u2013 22:00'
						),
						React.createElement(
							'a',
							{
								href: 'tel:+10000000000',
								className: 'header-contacts__phone header-contacts__item'
							},
							React.createElement(
								'span',
								{ className: 'header-contacts__icon header-contacts__icon_phone' },
								React.createElement('img', {
									src: '/assets/images/icons/phone_small.svg',
									alt: '',
									title: ''
								})
							),
							'+1 (000) 000-00-00'
						),
						React.createElement(
							'a',
							{
								href: 'https://wa.me/10000000000',
								target: '_blank',
								rel: 'noopener noreferrer',
								className: 'header-contacts__item'
							},
							React.createElement(
								'span',
								{ className: 'header-contacts__icon header-contacts__icon_whatsapp' },
								React.createElement('img', {
									src: '/assets/images/icons/whatsapp.svg',
									alt: '',
									title: ''
								})
							)
						)
					),
					React.createElement(CartIndicator, {
						cart: cart,
						onClick: this.cartToggle,
						cartIsActive: this.state.cartIsActive,
						cartlayerBtnInitialized: cartlayerBtnInitialized,
						settings: settings
					}),
					React.createElement(
						'div',
						{ className: 'header__burger' },
						!showBackButton && React.createElement(BurgerButton, {
							onClick: this.menuToggle,
							className: 'navbar-burger is-hidden-tablet'
						}),
						showBackButton && React.createElement(BackButton, { onClick: this.handleGoBack })
					),
					React.createElement(
						'div',
						{ className: this.state.cartIsActive ? 'mini-cart-open' : '' },
						React.createElement(
							'div',
							{ className: 'mini-cart' },
							React.createElement(
								'button',
								{
									type: 'button',
									className: 'modal-close',
									onClick: this.cartToggle
								},
								React.createElement(
									'svg',
									{ className: 'icon', width: '28' },
									React.createElement('use', { xlinkHref: '#close' })
								)
							),
							React.createElement(Cart, {
								cart: cart,
								deleteCartItem: this.props.deleteCartItem,
								settings: settings,
								cartToggle: this.cartToggle,
								cartlayerBtnInitialized: cartlayerBtnInitialized
							})
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'header__bottom ' },
					React.createElement(
						'div',
						{ className: 'header__navigation' },
						React.createElement(
							'button',
							{
								type: 'button',
								onClick: this.catalogToggle,
								className: 'navigation__catalog-button button button_catalog'
							},
							React.createElement(BurgerButton, { className: 'navbar-burger navbar-burger_catalog is-hidden-mobile' }),
							React.createElement('img', {
								src: '/assets/images/icons/icon_catalog.svg',
								className: 'catalog__icon is-hidden-tablet',
								alt: '',
								title: ''
							}),
							'Catalog'
						),
						React.createElement(
							'nav',
							{ className: 'navigation__menu' },
							React.createElement(HeaderBottomMenu, { items: themeSettings.footer_menu_2_items })
						)
					),
					React.createElement(SearchBox, {
						value: productFilter.search,
						onSearch: this.handleSearch,
						className: this.state.mobileSearchIsActive ? 'search-active' : ''
					})
				)
			),
			React.createElement('div', {
				className: this.state.mobileMenuIsActive || this.state.cartIsActive || this.state.mobileCatalogIsActive ? 'dark-overflow' : '',
				onClick: this.closeAll
			}),
			React.createElement(
				'div',
				{
					className: `mobile-menu is-hidden-tablet${this.state.mobileMenuIsActive ? ' mobile-menu-open' : ''}`
				},
				React.createElement(
					'button',
					{
						type: 'button',
						className: 'modal-close',
						onClick: this.menuToggle
					},
					React.createElement(
						'svg',
						{ className: 'icon', width: '28' },
						React.createElement('use', { xlinkHref: '#close' })
					)
				),
				React.createElement(
					'div',
					{ className: 'mobile-menu__contacts header-contacts' },
					React.createElement(
						'div',
						{ className: 'header-contacts__item' },
						React.createElement(
							'span',
							{ className: 'header-contacts__icon' },
							React.createElement('img', { src: '/assets/images/icons/pin.svg', alt: '', title: '' })
						),
						themeSettings.footer_contacts[0].text,
						',',
						' ',
						themeSettings.footer_contacts[1].text
					),
					React.createElement(
						'div',
						{ className: 'header-contacts__item' },
						React.createElement(
							'span',
							{ className: 'header-contacts__icon' },
							React.createElement('img', { src: '/assets/images/icons/clocks.svg', alt: '', title: '' })
						),
						'10:00 \u2013 22:00'
					),
					React.createElement(
						'a',
						{
							href: 'tel:+10000000000',
							className: 'header-contacts__phone header-contacts__item'
						},
						React.createElement(
							'span',
							{ className: 'header-contacts__icon' },
							React.createElement('img', {
								src: '/assets/images/icons/phone_small.svg',
								alt: '',
								title: ''
							})
						),
						'+1 (000) 000-00-00'
					),
					React.createElement(
						'a',
						{
							href: 'https://wa.me/10000000000',
							target: '_blank',
							className: ' header-contacts__item'
						},
						React.createElement(
							'span',
							{ className: 'header-contacts__icon' },
							React.createElement('img', { src: '/assets/images/icons/whatsapp.svg', alt: '', title: '' })
						)
					)
				)
			),
			React.createElement(
				'div',
				{
					className: `catalog-nav ${this.state.mobileCatalogIsActive ? ' catalog-nav-open' : ''}`
				},
				React.createElement(
					'button',
					{
						type: 'button',
						className: 'modal-close is-hidden-tablet',
						onClick: this.catalogToggle
					},
					React.createElement(
						'svg',
						{ className: 'icon', width: '28' },
						React.createElement('use', { xlinkHref: '#close' })
					)
				),
				React.createElement(
					'button',
					{
						type: 'button',
						onClick: this.catalogToggle,
						className: 'navigation__catalog-button button button_catalog is-hidden-mobile'
					},
					React.createElement(BurgerButton, { className: 'navbar-burger navbar-burger_catalog is-active' }),
					'Catalog'
				),
				React.createElement(
					'div',
					{ className: 'catalog-nav__title is-hidden-tablet' },
					'Catalog'
				),
				React.createElement(HeadMenu, {
					isMobile: true,
					categories: categories,
					location: location,
					onClick: this.catalogClose
				})
			)
		);
	}
}