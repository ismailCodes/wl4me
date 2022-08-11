import { SystemColors } from './models/SystemColors';
import { DefaultTheme } from 'styled-components';

const lightSystemColors: SystemColors = {
	backgroundMain: '#fafafa',
};

const lightTheme: DefaultTheme = {
	colors: {
		...lightSystemColors,
	},
	transition: {
		duration: 0.2,
	},
};

export default lightTheme;
