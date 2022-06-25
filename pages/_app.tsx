/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import '../styles/home.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* <Head>
			</Head> */}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
