import type { NextPage } from 'next';
import css from 'styled-jsx/css';
import Head from 'next/head';
import {
	AnchorHTMLAttributes,
	CSSProperties,
	FC,
	Fragment,
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

interface IParagraph extends HTMLAttributes<HTMLParagraphElement> {}
const Paragraph: FC<IParagraph> = ({ children, style, ...props }) => {
	const ParagraphStyles: CSSProperties = {
		margin: 0,
		padding: 0,
		...(style || {}),
	};
	return (
		<p style={ParagraphStyles} {...props}>
			{children}
		</p>
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
						<td align='center'>{children}</td>
					</Table>
				</td>
			</Table>
		</>
	);
};

const HeaderSection = () => {
	return (
		<>
			<Table
				width='100%'
				trs
				style={{
					padding: '4px 4px 0',
				}}
			>
				<td
					align='center'
					style={{ fontSize: '9.6px', padding: '12px 0 24px' }}
				>
					<Link href='#'> Shop the latest</Link>
				</td>
				<td align='center' style={{ fontSize: '9.6px', padding: '0 0 16px' }}>
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
								align: 'center',
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
					fontSize: 18,
					padding: '12px 4px',
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
						padding: '0 4px',
					}}
				>
					<td
						align='center'
						style={{
							fontWeight: '500',
							fontSize: 28,
							padding: '0 5px',
							fontStyle: 'italic',
							paddingTop: 4,
						}}
					>
						JUST DROPPED FOR HIM
					</td>
					<td
						align='center'
						style={{
							fontSize: 44,
							fontFamily: 'serif',
							fontWeight: 'lighter',
							lineHeight: 1,
							letterSpacing: 2,
						}}
					>
						CANADA GOOSE
					</td>
					<td
						align='center'
						style={{
							padding: 4,
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
								padding: 8,
							}}
						>
							SHOP NOW
						</Link>
					</td>
					<td align='center'>
						<Image
							style={{
								padding: '0 5px',
							}}
							src='./images/canda goose model.jpeg'
							alt='canda goose'
						/>
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
		<Table
			width='100%'
			trs
			style={{
				padding: '0 4px',
			}}
		>
			<td
				align='center'
				style={{ fontSize: 32, fontFamily: 'serif', fontWeight: 'lighter' }}
			>
				{title}
			</td>
			<td align='center' style={{ padding: 12 }}>
				{description}
			</td>
			<td align='center'>
				<Link
					href='#'
					style={{
						textDecoration: 'underline',
					}}
				>
					SHOP NOW
				</Link>
			</td>
			<td align='center'>
				<Image src={src} alt='knititude model' style={{ padding: 16 }} />
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
					<td align='center'>
						<Paragraph
							style={{
								fontWeight: 'lighter',
								fontSize: 44,
								marginTop: 16,
								fontFamily: 'serif',
								letterSpacing: 2,
							}}
						>
							NEW ARRIVALS
						</Paragraph>
					</td>
					<td align='center'>
						<Paragraph
							style={{
								fontStyle: 'italic',
								fontSize: 28,
								marginBottom: 16,
							}}
						>
							FOR HER
						</Paragraph>
					</td>
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
		<Table
			width='100%'
			trs
			style={{
				padding: '0 4px 44px',
			}}
		>
			<td
				align='center'
				style={{
					fontSize: 28,
				}}
			>
				THE HOME EDIT:
			</td>
			<td
				align='center'
				style={{
					fontSize: 28,
					fontFamily: 'serif',
					padding: '6px 0 12px',
				}}
			>
				KATE SPADE NEW YORK HOME
			</td>
			<td
				align='center'
				style={{
					padding: '12px 0px 24px',
				}}
			>
				From playful cherry print tea kettles and hors d&apos;oeuvres trays to
				polka dotted tidbit plates, bring home a touch of whimsy.
			</td>
			<td align='center'>
				<Link
					href='#'
					style={{
						textDecoration: 'underline',
					}}
				>
					SHOP NOW
				</Link>
			</td>
			<td
				align='center'
				style={{
					padding: '12px 4px',
				}}
			>
				<Image
					style={{
						padding: '0 10px',
					}}
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
					padding: '24px 12px',
					width: '90%',
				}}
			>
				<td
					align='center'
					style={{
						fontSize: 24,
					}}
				>
					UP TO 70% OFF
				</td>
				<td
					align='center'
					style={{
						padding: '4px 0 8px',
						fontSize: 34,
						fontFamily: 'serif',
					}}
				>
					NEW MARKDOWNS
				</td>
				<td
					align='center'
					style={{
						paddingBottom: 12,
					}}
				>
					Hundreds of new items added to the sale, hurry before they&apos;re all
					gone
				</td>
				<td>
					<Table tr align='center' width='100%'>
						{["WOMEN'S SALE", "MEN'S SALE"].map((item) => (
							<td align='center' key={item}>
								<Link
									href='#'
									style={{ textDecoration: 'underline', fontSize: 18 }}
								>
									{item}
								</Link>
							</td>
						))}
					</Table>
				</td>
			</Table>
			<Table
				width='100%'
				tr
				style={{
					padding: '44px 0 4px',
				}}
			>
				<td align='center'>
					<Image
						src='./images/afterpaye.jpeg'
						alt='afterpaye, SHOP NOW, PAY LATER! Split your purchase into 4 interest-free payments.'
					/>
				</td>
			</Table>

			<Table width='100%' trs>
				<td align='center' style={{ padding: '32px 0', fontSize: 32 }}>
					You may also love...
				</td>
				<td align='center'>
					<Image
						src='./images/a collection of different items you may love.jpeg'
						alt='a collection of different items you may love'
					/>
				</td>
			</Table>
			<Table
				className='line-separator'
				style={{
					width: '100%',
					borderBottom: '4px solid black',
					paddingTop: 64,
				}}
			></Table>
			<style global jsx>{`
				@media (prefers-color-scheme: dark) {
					.line-separator {
						border-bottom-color: white !important;
					}
				}
			`}</style>
		</>
	);
};

const FooterSection = () => {
	return (
		<Table
			width='100%'
			trs
			style={{
				padding: '0 4px 4px',
			}}
		>
			<td align='center' style={{ padding: 26 }} className='social-links'>
				{[
					{ src: './images/facebook icon.jpeg', alt: 'facebook icon' },
					{ src: './images/instagram icon.jpeg', alt: 'instagram icon' },
					{ src: './images/twitter icon.jpeg', alt: 'twitter icon' },
				].map(({ alt, src }, index) => (
					<Image
						style={{
							margin: '0 26px',
						}}
						key={index}
						src={src}
						alt={alt}
					/>
				))}
			</td>
			<td align='center'>
				<Table
					width='100%'
					trs
					style={{
						fontSize: 12,
						padding: '0 8px',
					}}
				>
					<td
						align='center'
						style={{
							paddingBottom: 13,
						}}
					>
						ensure delivery to your inbox, please add{' '}
						<Link
							href='mailto:info@email.lordandtaylor.com'
							style={{ textDecoration: 'underline', color: 'revert' }}
						>
							info@email.lordandtaylor.com
						</Link>{' '}
						to your address book/contacts
					</td>
					<td
						align='center'
						style={{
							paddingBottom: 52,
						}}
					>
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
						{[
							{ text: 'Privacy policy', href: '#' },
							{ text: 'Terms & Conditions', href: '#' },
							{ text: 'Unsubscribe', href: '#' },
						].map(({ text, href }, index, arr) => (
							<span key={index}>
								<Link href={href} style={{ textDecoration: 'underline' }}>
									{text}
								</Link>
								{index + 1 !== arr.length && ' | '}
							</span>
						))}
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
			<style global jsx>{`
				@media only screen and (max-width: 600px) {
					.social-links img {
						margin: 0 13px !important;
					}
				}
			`}</style>
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
