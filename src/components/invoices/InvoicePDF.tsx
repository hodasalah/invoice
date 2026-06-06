import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Polygon, Rect, Path } from '@react-pdf/renderer';
import type { InvoiceData } from '@/types/types';
const TopAccentPDF = () => (
	<Svg height="16" width="595.28" viewBox="0 0 595.28 16" style={{ width: '100%' }}>
		<Rect x="0" y="0" width="595.28" height="16" fill="#D1E2D5" />
		<Polygon points="20,0 26,0 16,16 10,16" fill="#ffffff" />
		<Polygon points="35,0 45,0 35,16 25,16" fill="#ffffff" />
		<Polygon points="55,0 75,0 65,16 45,16" fill="#ffffff" />
		<Polygon points="80,0 86,0 76,16 70,16" fill="#ffffff" />
		<Polygon points="95,0 135,0 125,16 85,16" fill="#ffffff" />
		<Polygon points="575,0 585,0 575,16 565,16" fill="#ffffff" />
		<Polygon points="555,0 561,0 551,16 545,16" fill="#ffffff" />
		<Polygon points="530,0 550,0 540,16 520,16" fill="#ffffff" />
		<Polygon points="515,0 525,0 515,16 505,16" fill="#ffffff" />
		<Polygon points="460,0 500,0 490,16 450,16" fill="#ffffff" />
	</Svg>
);

const BottomAccentPDF = () => (
	<Svg height="16" width="595.28" viewBox="0 0 595.28 16" style={{ width: '100%', marginTop: 'auto' }}>
		<Rect x="0" y="0" width="595.28" height="16" fill="#D1E2D5" />
		<Polygon points="20,0 26,0 16,16 10,16" fill="#ffffff" />
		<Polygon points="35,0 45,0 35,16 25,16" fill="#ffffff" />
		<Polygon points="55,0 75,0 65,16 45,16" fill="#ffffff" />
		<Polygon points="80,0 86,0 76,16 70,16" fill="#ffffff" />
		<Polygon points="95,0 135,0 125,16 85,16" fill="#ffffff" />
		<Polygon points="575,0 585,0 575,16 565,16" fill="#ffffff" />
		<Polygon points="555,0 561,0 551,16 545,16" fill="#ffffff" />
		<Polygon points="530,0 550,0 540,16 520,16" fill="#ffffff" />
		<Polygon points="515,0 525,0 515,16 505,16" fill="#ffffff" />
		<Polygon points="460,0 500,0 490,16 450,16" fill="#ffffff" />
	</Svg>
);

const CompanyLogoPDF = ({ name }: { name: string }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <View style={{ width: 38, height: 38, marginRight: 8, backgroundColor: '#D1E2D5', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
      <Text style={{ color: '#44814E', fontSize: 18, fontFamily: 'Helvetica-Bold' }}>{initials}</Text>
    </View>
  );
};

const PinIcon = () => (
	<Svg height="8" width="8" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
		<Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#44814E" />
	</Svg>
);

const PhoneIcon = () => (
	<Svg height="8" width="8" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
		<Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#44814E" />
	</Svg>
);

const MailIcon = () => (
	<Svg height="8" width="8" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
		<Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#44814E" />
	</Svg>
);

const GlobeIcon = () => (
	<Svg height="8" width="8" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
		<Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#44814E" />
	</Svg>
);

const HeaderLinePDF = ({ t }: { t: (key: string) => string }) => (
	<View style={styles.invoiceHeaderContainer}>
		<View style={styles.headerLineSide} />
		<Text style={styles.headerTitleText}>{t('invoice').toUpperCase()}</Text>
		<View style={styles.headerLineSide} />
	</View>
);

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffffff',
		fontFamily: 'Helvetica',
		color: '#3a3a3a',
		flexDirection: 'column',
		height: '100%',
		padding: 0,
	},
	bodyContainer: {
		paddingHorizontal: 40,
		paddingVertical: 30,
		flexDirection: 'column',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	logoSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	companyName: {
		fontSize: 16,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		lineHeight: 1.1,
	},
	companySub: {
		fontSize: 8,
		letterSpacing: 2,
		fontFamily: 'Helvetica-Bold',
		color: '#94a3b8',
		marginTop: 2,
	},
	contactSection: {
		width: 250,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	contactItem: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	contactText: {
		fontSize: 7.5,
		color: '#475569',
		fontFamily: 'Helvetica',
	},
	invoiceHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 15,
	},
	headerLineSide: {
		flex: 1,
		height: 3,
		backgroundColor: '#D1E2D5',
	},
	headerTitleText: {
		fontSize: 18,
		fontFamily: 'Helvetica-Bold',
		letterSpacing: 6,
		color: '#44814E',
		marginHorizontal: 12,
	},
	billToSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	billToColumn: {
		flex: 1,
	},
	billToTitle: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		letterSpacing: 1.5,
		marginBottom: 6,
	},
	clientCard: {
		backgroundColor: '#f8fafc',
		border: '1px solid #f1f5f9',
		padding: 8,
		borderRadius: 6,
		maxWidth: 240,
	},
	clientName: {
		fontSize: 8.5,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		marginBottom: 2,
	},
	clientText: {
		fontSize: 7.5,
		color: '#475569',
		marginBottom: 1.5,
	},
	infoBox: {
		border: '2px solid #D1E2D5',
		padding: 8,
		width: 220,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
		borderBottom: '1px solid #f1f5f9',
		paddingBottom: 3,
	},
	infoLabel: {
		fontSize: 7.5,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		textTransform: 'uppercase',
	},
	infoValue: {
		fontSize: 7.5,
		fontFamily: 'Helvetica',
		color: '#334155',
		textAlign: 'right',
	},
	tableSection: {
		marginBottom: 20,
	},
	tableSectionTitle: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		letterSpacing: 1.5,
		marginBottom: 6,
	},
	tableHeader: {
		flexDirection: 'row',
		borderBottom: '1px solid #D1E2D5',
		borderTop: '1px solid #D1E2D5',
		borderLeft: '1px solid #D1E2D5',
		borderRight: '1px solid #D1E2D5',
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	tableHeaderColNo: { width: '8%', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#44814E', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableHeaderColDesc: { width: '52%', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#44814E', paddingLeft: 8, borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableHeaderColQty: { width: '10%', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#44814E', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableHeaderColRate: { width: '15%', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#44814E', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableHeaderColAmount: { width: '15%', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#44814E', textAlign: 'right', paddingRight: 8, paddingVertical: 5 },
	
	tableRow: {
		flexDirection: 'row',
		borderBottom: '1px solid #D1E2D5',
		borderLeft: '1px solid #D1E2D5',
		borderRight: '1px solid #D1E2D5',
		alignItems: 'center',
	},
	tableColNo: { width: '8%', fontSize: 7.5, color: '#64748b', fontFamily: 'Helvetica-Bold', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableColDesc: { width: '52%', fontSize: 7.5, color: '#334155', paddingLeft: 8, borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableColQty: { width: '10%', fontSize: 7.5, color: '#334155', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableColRate: { width: '15%', fontSize: 7.5, color: '#334155', textAlign: 'center', borderRight: '1px solid #D1E2D5', paddingVertical: 5 },
	tableColAmount: { width: '15%', fontSize: 7.5, color: '#44814E', fontFamily: 'Helvetica-Bold', textAlign: 'right', paddingRight: 8, paddingVertical: 5 },

	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	paymentBox: {
		width: '55%',
	},
	paymentTitle: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		textTransform: 'uppercase',
		marginBottom: 4,
	},
	paymentDetailsCard: {
		border: '1px solid #D1E2D5',
		padding: 8,
		fontSize: 7.5,
		color: '#334155',
		lineHeight: 1.4,
	},
	calcBox: {
		width: '40%',
	},
	calcRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 6,
		border: '1px solid #D1E2D5',
		borderBottom: 0,
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	calcGrandRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 8,
		border: '1px solid #D1E2D5',
		backgroundColor: '#ffffff',
		borderTopWidth: 2,
		borderTopColor: '#D1E2D5',
		alignItems: 'center',
	},
	calcLabel: {
		fontSize: 7.5,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		textTransform: 'uppercase',
	},
	calcValue: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#334155',
	},
	calcGrandLabel: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		textTransform: 'uppercase',
	},
	calcGrandValue: {
		fontSize: 9,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
	},
	notesSection: {
		marginTop: 10,
	},
	notesTitle: {
		fontSize: 8,
		fontFamily: 'Helvetica-Bold',
		color: '#44814E',
		textTransform: 'uppercase',
		marginBottom: 4,
	},
	notesCard: {
		border: '1px solid #D1E2D5',
		padding: 8,
		fontSize: 7.5,
		color: '#475569',
		lineHeight: 1.4,
	},
});

interface InvoicePDFProps {
	invoice: InvoiceData;
	userProfile?: any;
	t?: (key: string) => string;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, userProfile, t: parentT }) => {
	const dictionary: Record<string, string> = {
		bill_to: 'BILL TO',
		invoice_number: 'Invoice Number',
		date: 'Invoice Date',
		due_date: 'Due Date',
		project_service_details: 'PROJECT / SERVICE DETAILS',
		no: 'NO',
		project_service: 'PROJECT / SERVICE',
		qty: 'QTY',
		rate: 'RATE',
		amount: 'AMOUNT',
		payment_methods_accepted: 'Payment Methods Accepted:',
		vat: 'TAX (15%)',
		total_due: 'TOTAL',
		notes: 'NOTES',
		invoice: 'INVOICE',
		company: 'Company'
	};

	const t = parentT || ((key: string) => dictionary[key] || key);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: invoice.currency || 'USD',
		}).format(amount);
	};

	const senderName = invoice.senderName || userProfile?.companyName || 'Arowwai Industries';
	const senderAddress = invoice.senderAddress || (userProfile?.address
		? `${userProfile.address.street || ''}, ${userProfile.address.city || ''}`.trim().replace(/^,\s*|,\s*$/g, '')
		: '123 Anywhere St., Any City');
	const senderPhone = invoice.senderPhone || userProfile?.phone || '+123-456-7890';
	const senderEmail = invoice.senderEmail || userProfile?.email || 'hello@reallygreatsite.com';
	const senderWebsite = invoice.senderWebsite || 'www.reallygreatsite.com';
	const paymentDetails = invoice.paymentDetails || "Payment Methods Accepted:\nBank Transfer / Credit Card / E-Wallet / PayPal\nLarana Bank\nOlivia Wilson\n+123-456-7890";
	const notes = invoice.notes || "Thank you for your business!\nPlease make payment by the due date.\nFor questions regarding this invoice, contact us at hello@reallygreatsite.com";

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				
				<TopAccentPDF />

				<View style={styles.bodyContainer}>
					
					<View style={styles.headerContainer}>
						<View style={styles.logoSection}>
							<CompanyLogoPDF name={senderName} />
							<View>
								<Text style={styles.companyName}>{senderName}</Text>
								<Text style={styles.companySub}>{t('company').toUpperCase()}</Text>
							</View>
						</View>

						<View style={styles.contactSection}>
							<View style={styles.contactItem}>
								<PinIcon />
								<Text style={styles.contactText}>{senderAddress}</Text>
							</View>
							<View style={styles.contactItem}>
								<MailIcon />
								<Text style={styles.contactText}>{senderEmail}</Text>
							</View>
							<View style={styles.contactItem}>
								<PhoneIcon />
								<Text style={styles.contactText}>{senderPhone}</Text>
							</View>
							<View style={styles.contactItem}>
								<GlobeIcon />
								<Text style={styles.contactText}>{senderWebsite}</Text>
							</View>
						</View>
					</View>

					<HeaderLinePDF t={t} />

					<View style={styles.billToSection}>
						<View style={styles.billToColumn}>
							<Text style={styles.billToTitle}>{t('bill_to')}</Text>
							<View style={styles.clientCard}>
								<Text style={styles.clientName}>{invoice.clientName}</Text>
								<Text style={styles.clientText}>{invoice.clientEmail}</Text>
								<Text style={styles.clientText}>{invoice.clientPhone}</Text>
								<Text style={styles.clientText}>
									{invoice.clientAddress?.street && `${invoice.clientAddress.street}, `}
									{invoice.clientAddress?.city && `${invoice.clientAddress.city}`}
									{invoice.clientAddress?.country && `, ${invoice.clientAddress.country}`}
								</Text>
							</View>
						</View>

						<View style={styles.infoBox}>
							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>{t('invoice_number')}:</Text>
								<Text style={styles.infoValue}>{invoice.invoiceNumber || invoice.id || '-'}</Text>
							</View>
							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>{t('date')}:</Text>
								<Text style={styles.infoValue}>{invoice.date}</Text>
							</View>
							<View style={[styles.infoRow, { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }]}>
								<Text style={styles.infoLabel}>{t('due_date')}:</Text>
								<Text style={styles.infoValue}>{invoice.dueDate}</Text>
							</View>
						</View>
					</View>

					<View style={styles.tableSection}>
						<Text style={styles.tableSectionTitle}>{t('project_service_details')}</Text>
						
						<View style={styles.tableHeader}>
							<Text style={styles.tableHeaderColNo}>{t('no')}</Text>
							<Text style={styles.tableHeaderColDesc}>{t('project_service')}</Text>
							<Text style={styles.tableHeaderColQty}>{t('qty')}</Text>
							<Text style={styles.tableHeaderColRate}>{t('rate')}</Text>
							<Text style={styles.tableHeaderColAmount}>{t('amount')}</Text>
						</View>

						{invoice.items?.map((item, i) => (
							<View style={styles.tableRow} key={item.id || i}>
								<Text style={styles.tableColNo}>{String(i + 1).padStart(2, '0')}</Text>
								<Text style={styles.tableColDesc}>{item.description}</Text>
								<Text style={styles.tableColQty}>{item.quantity}</Text>
								<Text style={styles.tableColRate}>{formatCurrency(item.price)}</Text>
								<Text style={styles.tableColAmount}>{formatCurrency(item.total)}</Text>
							</View>
						))}

						{invoice.items.length < 3 && Array.from({ length: 3 - invoice.items.length }).map((_, idx) => (
							<View style={styles.tableRow} key={`spacer-${idx}`}>
								<Text style={styles.tableColNo}>{String(invoice.items.length + idx + 1).padStart(2, '0')}</Text>
								<View style={{ width: '52%', borderRightWidth: 1, borderRightColor: '#D1E2D5', height: 20 }} />
								<View style={{ width: '10%', borderRightWidth: 1, borderRightColor: '#D1E2D5', height: 20 }} />
								<View style={{ width: '15%', borderRightWidth: 1, borderRightColor: '#D1E2D5', height: 20 }} />
								<View style={{ width: '15%', height: 20 }} />
							</View>
						))}
					</View>

					<View style={styles.bottomContainer}>
						<View style={styles.paymentBox}>
							<Text style={styles.paymentTitle}>{t('payment_methods_accepted')}</Text>
							<View style={styles.paymentDetailsCard}>
								<Text>{paymentDetails}</Text>
							</View>
						</View>

						<View style={styles.calcBox}>
							<View style={styles.calcRow}>
								<Text style={styles.calcLabel}>{t('vat')}</Text>
								<Text style={styles.calcValue}>{formatCurrency(invoice.vat)}</Text>
							</View>
							<View style={styles.calcGrandRow}>
								<Text style={styles.calcGrandLabel}>{t('total_due')}</Text>
								<Text style={styles.calcGrandValue}>{formatCurrency(invoice.total)}</Text>
							</View>
						</View>
					</View>

					<View style={styles.notesSection}>
						<Text style={styles.notesTitle}>{t('notes')}</Text>
						<View style={styles.notesCard}>
							<Text>{notes}</Text>
						</View>
					</View>

				</View>

				<BottomAccentPDF />

			</Page>
		</Document>
	);
};

export default InvoicePDF;
