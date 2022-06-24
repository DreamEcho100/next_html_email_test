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
				/*
				return {
					...node,
					props: {
						...node.props,
						children: node.props.children.map(transform),
					},
        };
        */
			}
			if (Array.isArray(node)) {
				return <>{node.map(transform)}</>;
			}

			return node;
		};

		return transform(res);
	}
}
const pagesWithoutReact = ['/'];
class StaticDocument extends Document {
	render() {
		const { __NEXT_DATA__ } = this.props;

		return (
			<html>
				<CustomHead />
				<body>
					<Main />
					{!pagesWithoutReact.includes(__NEXT_DATA__.page) ? (
						<NextScript />
					) : null}
					{/* <NextScript>
						<script>{JSON.stringify(__NEXT_DATA__)}</script>
					</NextScript> */}
				</body>
			</html>
		);
	}
}

export default process.env.NODE_ENV === 'production'
	? StaticDocument
	: Document;
