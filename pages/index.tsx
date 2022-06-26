import type { NextPage } from 'next';
import css from 'styled-jsx/css';
import Head from 'next/head';
import {
	AnchorHTMLAttributes,
	CSSProperties,
	FC,
	HTMLAttributes,
	ImgHTMLAttributes,
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactNode,
	ReactPortal,
	TableHTMLAttributes,
	TdHTMLAttributes,
} from 'react';

interface ITableProps extends TableHTMLAttributes<HTMLTableElement> {
	children?:
		| string
		| number
		| boolean
		| ReactFragment
		| ReactElement<any, string | JSXElementConstructor<any>>
		| ReactPortal
		| JSX.Element
		| null
		| undefined;
	tr?: boolean | HTMLAttributes<HTMLTableRowElement>;
	trs?: boolean;
}

const Table: FC<ITableProps> = ({
	children,
	style,
	cellSpacing,
	cellPadding,
	tr,
	trs,
	...props
}) => {
	const tableStyles: CSSProperties = {
		margin: 0,
		padding: 0,
		border: 0,
		...(style || {}),
	};

	const renderBasedOnElementType = () => {
		if (!tr && Array.isArray(children)) {
			return (
				<tbody>
					{children.map((child, index) => {
						if (child.type === 'tr' || child.type === 'style') return child;

						return (
							<tr
								key={child?.key || index}
								{...((typeof tr === 'object' && tr) || {})}
							>
								{trs && child?.type === 'td' ? child : <td>{child}</td>}
							</tr>
						);
					})}
				</tbody>
			);
		}

		const handleWrappingInTr = (
			children:
				| ReactFragment
				| ReactElement<any, string | JSXElementConstructor<any>>
				| ReactPortal
				| JSX.Element
		) => {
			if (
				'type' in children &&
				(children.type === 'tr' || children.type === 'style')
			)
				return children;
			if (tr)
				return <tr {...((typeof tr === 'object' && tr) || {})}>{children}</tr>;
			return children;
		};

		if (
			!children ||
			typeof children === 'string' ||
			typeof children === 'number' ||
			typeof children === 'boolean'
		)
			return (
				<tbody>
					<tr {...((typeof tr === 'object' && tr) || {})}>
						<td>{children}</td>
					</tr>
				</tbody>
			);

		if (
			'type' in children &&
			['tfoot', 'thead', 'tbody'].includes(children?.type)
		)
			return children;

		return <tbody>{handleWrappingInTr(children)}</tbody>;
	};
	return (
		<table
			cellSpacing={cellSpacing || 0}
			cellPadding={cellPadding || 0}
			style={tableStyles}
			{...props}
		>
			{renderBasedOnElementType()}
		</table>
	);
};

const Trs: FC<{
	children: JSX.Element[];
	td?: TdHTMLAttributes<HTMLTableCellElement>;
}> = ({ children, td }) => {
	return (
		<>
			{children.map((child: JSX.Element, index) => {
				if (child.type === 'tr') return child;
				return (
					<tr key={child?.key || index}>
						{child?.type === 'td' ? child : <td {...(td || {})}>{child}</td>}
					</tr>
				);
			})}
		</>
	);
};

const Tr: FC<{
	children: JSX.Element[];
	td?: TdHTMLAttributes<HTMLTableCellElement>;
}> = ({ children, td }) => {
	return (
		<tr>
			{children.map((child, index) =>
				child?.type === 'td' ? (
					child
				) : (
					<td key={child?.key || index} {...(td || {})}>
						{child}
					</td>
				)
			)}
		</tr>
	);
};

interface IImage extends ImgHTMLAttributes<HTMLImageElement> {}
const Image: FC<IImage> = ({ src, style, ...props }) => {
	const imageStyles: CSSProperties = {
		maxWidth: '100%',
		...(style || {}),
	};
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			{...{
				src: !src ? '' : src.startsWith('http') ? src : `./${src}`,
			}}
			alt=''
			{...props}
			style={imageStyles}
		/>
	);
};

interface ILink extends AnchorHTMLAttributes<HTMLAnchorElement> {}
const Link: FC<ILink> = ({ children, style, ...props }) => {
	const linkStyles: CSSProperties = {
		textDecoration: 'none',
		color: 'inherit',
		fontSize: 'inherit',
		...(style || {}),
	};
	return (
		<a style={linkStyles} {...props}>
			{children}
		</a>
	);
};

const EmailWrapper: FC<{ children?: ReactNode }> = ({ children }) => {
	const globalStyles = css.global`
		:root {
			color-scheme: light dark;
			supported-color-schemes: light dark;
		}
		@media (prefers-color-scheme: dark) {
			.wrapper {
				background-color: white !important;
			}
			.container {
				background-color: #06130e !important;
			}
		}
		@media only screen and (min-width: 960px) {
			.container {
				width: 960px;
			}
		}
		@media only screen and (max-width: 960px) {
			.container {
				width: 600px;
			}
		}
		@media only screen and (max-width: 600px) {
			.container {
				width: 100px;
			}
		}
	`;

	return (
		<>
			<style jsx global>
				{globalStyles}
			</style>
			<Table
				width='100%'
				style={{
					backgroundColor: 'black',
					fontFamily:
						"'Open Sans', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
				}}
				tr
				className='wrapper'
			>
				<td align='center'>
					<Table
						key={2}
						style={{
							backgroundColor: 'white',
						}}
						width='600'
						tr
						className='container'
					>
						<td>{children}</td>
					</Table>
				</td>
			</Table>
		</>
	);
};

const HeaderSection = () => {
	return (
		<>
			<Table width='100%' trs>
				<td
					align='center'
					style={{ fontSize: '9.6px', padding: '12px 0 24px' }}
				>
					<Link href='#'> Shop the latest</Link>
				</td>
				<td align='center' style={{ fontSize: '9.6px', padding: '0 0 6px' }}>
					<Link href='#' style={{ textDecoration: 'underline' }}>
						View in Browser
					</Link>
				</td>
				<td align='center'>
					<h1 style={{ margin: 0 }}>Lord & Taylor</h1>
				</td>
				<td>
					<Table align='center' width='100%' className='nav'>
						<Tr
							td={{
								style: {
									padding: '10px 5px',
								},
							}}
						>
							<Link href='#'>WOMEN</Link>
							<Link href='#'>MEN</Link>
							<Link href='#'>BEAUTY</Link>
							<Link href='#'>HOME</Link>
							<Link href='#'>SALE</Link>
						</Tr>
					</Table>
				</td>
			</Table>
			<style global jsx>{`
				@media only screen and (min-width: 960px) {
					.nav td {
						padding: 0 1em;
					}
				}
			`}</style>
		</>
	);
};

const CanadaGooseSection = () => {
	return (
		<Table width='100%' trs>
			<td
				align='center'
				style={{
					backgroundColor: 'black',
					color: 'white',
					fontSize: '16px',
					padding: '8px 0',
				}}
				className='header'
			>
				FREE SHIPPING ON ORDERS OVER $99
			</td>
			<td align='center'>
				<Table
					width='100%'
					trs
					style={{
						backgroundImage: 'linear-gradient(180deg, #cccdd3, #e7e4ec)',
						color: 'black',
					}}
				>
					<td
						align='center'
						style={{
							fontWeight: '500',
							fontSize: '20px',
							padding: '0 5px',
							fontStyle: 'italic',
							paddingTop: '5px',
						}}
					>
						JUST DROPPED FOR HIM
					</td>
					<td align='center' style={{ fontWeight: '500', fontSize: '28px' }}>
						CANADA GOOSE
					</td>
					<td
						align='center'
						style={{
							padding: '4px',
						}}
					>
						Embrace the great outdoors in expertly-crafted
					</td>
					<td align='center'>
						<Link
							href='#'
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								padding: '8px',
							}}
						>
							SHOP NOW
						</Link>
					</td>
					<td align='center'>
						<Image src='./images/canda goose model.jpeg' alt='canda goose' />
					</td>
				</Table>
			</td>
			<style global jsx>{`
				@media (prefers-color-scheme: dark) {
					.header {
						background-color: white !important;
						color: black !important;
					}
				}
			`}</style>
		</Table>
	);
};

const NewArrivalsSectionItem = ({
	title,
	description,
	src,
}: {
	title: string;
	description: string;
	src: string;
}) => {
	return (
		<Table width='100%' trs>
			<td align='center'>{title}</td>
			<td align='center'>{description}</td>
			<td align='center'>SHOP NOW</td>
			<td align='center'>
				<Image src={src} alt='knititude model' />
			</td>
		</Table>
	);
};
const NewArrivalsSection = () => {
	const data = [
		{
			title: 'KNITITUDE',
			description: 'Elevated everyday styles featuring oh-so-soft knits.',
			src: './images/knititude model.jpeg',
		},
		{
			title: 'NINE WEST',
			description: 'From statement pumps to sleek boots.',
			src: './images/nine west boot.jpeg',
		},
	];

	return (
		<Table width='100%' tr>
			<td>
				<Table width='100%' trs>
					<td align='center'>NEW ARRIVALS</td>
					<td align='center'>FOR HER</td>
				</Table>
				{data.map((item) => (
					<NewArrivalsSectionItem key={item.title} {...item} />
				))}
			</td>
		</Table>
	);
};

const HomeEditSection = () => {
	return (
		<Table width='100%' trs>
			<td align='center'>THE HOME EDIT:</td>
			<td align='center'>KATE SPADE NEW YORK HOME</td>
			<td align='center'>
				From playful cherry print tea kettles and hors d&apos;oeuvres trays to
				polka dotted tidbit plates, bring home a touch of whimsy.
			</td>
			<td align='center'>SHOP NOW</td>
			<td align='center'>
				<Image
					src='./images/kate spade new york home example.jpeg'
					alt='kate spade new york home example'
				/>
			</td>
		</Table>
	);
};

const OffersAddsRecommendationSection = () => {
	return (
		<>
			<Table
				width='100%'
				trs
				style={{
					backgroundColor: '#5ac2ab',
					color: 'white',
				}}
			>
				<td align='center'>UP TO 70% OFF</td>
				<td align='center'>NEW MARKDOWNS</td>
				<td align='center'>
					Hundreds of new items added to the sale, hurry before they&apos;re all
					gone
				</td>
				<td>
					<Table tr align='center' width='100%'>
						<td align='center'>WOMEN&apos;S SALE</td>
						<td align='center'>MEN&apos;S SALE</td>
					</Table>
				</td>
			</Table>
			<Table width='100%' tr>
				<td align='center'>
					<Image
						src='./images/afterpaye.jpeg'
						alt='afterpaye, SHOP NOW, PAY LATER! Split your purchase into 4 interest-free payments.'
					/>
				</td>
			</Table>

			<Table width='100%' trs>
				<td align='center'>You may also love...</td>
				<td align='center'>
					<Image
						src='./images/a collection of different items you may love.jpeg'
						alt='a collection of different items you may love'
					/>
				</td>
			</Table>
		</>
	);
};

const FooterSection = () => {
	return (
		<Table width='100%' trs>
			<td align='center'>
				<Image src='./images/facebook icon.jpeg' alt='facebook icon' />
				<Image src='./images/instagram icon.jpeg' alt='instagram icon' />
				<Image src='./images/twitter icon.jpeg' alt='twitter icon' />
			</td>
			<td align='center'>
				<Table width='100%' trs>
					<td align='center'>
						ensure delivery to your inbox, please add info
						@email.lordandtaylor.com to your address book/contacts
					</td>
					<td align='center'>
						Receiving Free Shipping with your purchase over $99 is easy.
						Here&apos;s how: Qualifying orders will automatically have their
						shipping charges adjusted during the checkout process. This offer is
						good only for standard shipping within the United States to the
						address in your order. Qualifying amount applies to current
						merchandise purchase only, not previous purchases, gift boxes,
						packaging, taxes, shipping & handling, value of Lord & Taylor Gift
						Cards or online gift certificates purchased. Not redeemable for cash
						nor accepted as payment for any credit card account. No adjustment
						on previous purchases. Offer is nontransferable without consent from
						Lord & Taylor. Subject to purchase approval. Cash value of 1/100
						cent. Valid in USA only.
					</td>
					<td align='center'>
						Privacy policy | Terms & Conditions | Unsubscribe
					</td>
					<td align='center'>
						<Table width='100%' trs>
							<td align='center'>Lord & Taylor</td>
							<td align='center'>275 Madison Avenue</td>
							<td align='center'>New York, NY 10016</td>
						</Table>
					</td>
				</Table>
			</td>
		</Table>
	);
};

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='./favicon.ico' />
			</Head>

			<EmailWrapper>
				<HeaderSection />
				<CanadaGooseSection />
				<NewArrivalsSection />
				<HomeEditSection />
				<OffersAddsRecommendationSection />
				<FooterSection />
			</EmailWrapper>
		</>
	);
};

export default Home;
