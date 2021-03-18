var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import InputMask from 'react-input-mask';

const InputFieldMobile = field => React.createElement(
	'div',
	{ className: field.className },
	React.createElement(InputMask, _extends({
		mask: '+9 (999) 999-9999',
		maskPlaceholder: null,
		placeholder: field.label
	}, field.input, {
		disabled: field.disabled,
		type: field.type,
		id: field.id,
		className: field.meta.touched && field.meta.error ? 'invalid' : ''
	})),
	React.createElement(
		'label',
		{ htmlFor: field.id },
		field.meta.touched && field.meta.error && React.createElement(
			'span',
			{ className: 'error' },
			field.meta.error
		),
		React.createElement(
			'span',
			{ className: 'input__label' },
			field.label
		)
	)
);

export default InputFieldMobile;