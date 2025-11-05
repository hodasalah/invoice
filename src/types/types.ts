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
	clientAddress: string;

	items: InvoiceItem[];
	notes?: string;
	subTotal: number;
	vat: number;
	total: number;

	status?: 'paid' | 'unpaid';
	userId?: string;
}
export interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
}
