import { FC, ReactNode, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import lightTheme from './themes/lightTheme';
import { Helmet } from 'react-helmet';

type StyleProviderProps = {
	children: ReactNode;
};

const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
	const [theme] = useState<DefaultTheme>(lightTheme);

	return (
		<ThemeProvider theme={theme}>
			<Helmet>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Poppins:400,600"
				/>
			</Helmet>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	);
};

export default StyleProvider;
