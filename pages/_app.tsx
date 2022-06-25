/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import '../styles/home.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta httpEquiv='Content-Type' content='text/html charset=UTF-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				></meta>
				<meta name='color-scheme' content='light dark' />
				<meta name='supported-color-schemes' content='light dark' />
				<title>HTML Email Template Project</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
