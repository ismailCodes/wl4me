import type { AppProps } from 'next/app';
import StyleProvider from 'styles/StyleProvider';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StyleProvider>
			<Component {...pageProps} />
		</StyleProvider>
	);
}

export default MyApp;
