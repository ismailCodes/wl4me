import 'styled-components';
import { DefaultThemeColors } from './styles/themes/models/DefaultThemeColors';

// Redefines and exports a new DefaultTheme type
declare module 'styled-components' {
	export interface DefaultTheme {
		colors: DefaultThemeColors;
		transition: {
			duration: number;
		};
	}
}

declare module '*.svg';
declare module '*.jpg';
declare module '*.ttf';
