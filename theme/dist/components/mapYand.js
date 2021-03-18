import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';

class MapYand extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return React.createElement(
			Fragment,
			null,
			React.createElement(
				YMaps,
				null,
				React.createElement(
					Map,
					{
						defaultState: this.props.mapState,
						modules: ['templateLayoutFactory', 'layout.ImageWithContent']
					},
					React.createElement(Placemark, {
						geometry: this.props.mapState.center,
						options: this.props.placeMarkOptions,
						properties: {
							hintContent: 'Наш магазин',
							balloonContent: 'г.Казань, ул.Восстания, д.100'
						}
					}),
					React.createElement(ZoomControl, {
						options: {
							size: 'small'
						}
					})
				)
			)
		);
	}
}

MapYand.defaultProps = {
	mapState: {
		center: [55.83342, 49.050422],
		zoom: 14,
		behaviors: ["disable('scrollZoom')", 'drag'],
		controls: []
	},
	placeMarkOptions: {
		iconLayout: 'default#image',
		iconImageHref: '/assets/images/pin.svg',
		iconImageSize: [24, 33],
		iconImageOffset: [-12, -17]
	}
};
export default MapYand;