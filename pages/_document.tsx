/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
// pages/_document.js
import Document, { Main, Head, NextScript } from 'next/document';

class CustomHead extends Head {
	render() {
		const res = super.render();

		const transform = (node: JSX.Element): JSX.Element => {
			// remove all link preloads
			if (
				node &&
				node.type === 'link' &&
				node.props &&
				node.props.rel === 'preload'
			) {
				return <></>;
			}
			if (node && node.props && node.props.children) {
				return {
					...node,
					props: {
						...node.props,
						children: Array.isArray(node.props.children)
							? node.props.children.map(transform)
							: transform(node.props.children),
					},
				};

				// return {
				// 	...node,
				// 	props: {
				// 		...node.props,
				// 		children: node.props.children.map(transform),
				// 	},
				// };
			}
			if (Array.isArray(node)) {
				return <>{node.map(transform)}</>;
			}

			return node;
		};

		return transform(res);
	}
}

/*
const transform = (node: JSX.Element): JSX.Element => {
	if (node?.type === 'link' && node?.props.rel === 'preload') {
		return <></>;
	}

	if (node?.props?.children) {
		return {
			...node,
			props: {
				...node.props,
				children: Array.isArray(node.props.children)
					? node.props.children.map(transform)
					: transform(node.props.children),
			},
		};
	}

	if (Array.isArray(node)) {
		return <>{node.map(transform)}</>;
	}

	return node;
};

class CustomHead extends Head {
	public override render() {
		return transform(super.render());
	}
}
*/

const pagesWithoutReact = ['/'];
class StaticDocument extends Document {
	render() {
		const { __NEXT_DATA__ } = this.props;

		return (
			<html
				style={{
					margin: '0',
					padding: '0',
					minWidth: '100%',
				}}
			>
				{process.env.NODE_ENV === 'production' ? <CustomHead /> : <Head />}
				<body
					style={{
						margin: '0',
						padding: '0',
						minWidth: '100%',
					}}
				>
					<Main />
					{process.env.NODE_ENV === 'production' &&
					!pagesWithoutReact.includes(__NEXT_DATA__.page) ? (
						<NextScript />
					) : (
						<NextScript />
					)}
					{/* <NextScript>
						<script>{JSON.stringify(__NEXT_DATA__)}</script>
					</NextScript> */}
				</body>
			</html>
		);
	}
}

// ---------------------------------------------------
export default process.env.NODE_ENV === 'production'
	? StaticDocument
	: Document;
// ---------------------------------------------------
