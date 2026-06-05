// ✅ Invoice Item Type
export interface InvoiceItem {
	id: string;
	description: string;
	quantity: number;
	price: number;
	total: number;
}

// ✅ Invoice Main Type
export interface InvoiceData {
	id?: string; // عند إنشاء فاتورة جديدة لا يوجد ID بعد
	invoiceNumber: string;
	date: string;
	dueDate: string;
	currency: string;

	clientId: string;
	clientName: string;
	clientEmail: string;
	clientPhone: string;
	clientAddress: {
		street: string;
		city: string;
		state: string;
		country: string;
		zip: string;
	};

	items: InvoiceItem[];
	notes?: string;
	subTotal: number;
	vat: number;
	total: number;

	status?: 'paid' | 'unpaid';
	userId?: string;

	// Custom branding/design fields
	senderName?: string;
	senderAddress?: string;
	senderPhone?: string;
	senderEmail?: string;
	senderWebsite?: string;
	paymentDetails?: string;
}
export interface Client {
	id?: string;
	userId: string;
	name: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		zip: string;
	};
}
export interface DashboardStats {
  revenue: number;
  outstanding: number;
  clients: number;
  payments: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface InvoiceStatus {
  paid: number;
  unpaid: number;
}
