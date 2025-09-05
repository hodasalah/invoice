// src/routes/SeedPage.tsx
import { addData, setUserData } from '../firebaseConfigs/firestore';
import { faker } from '@faker-js/faker';

const SeedPage = () => {
	const handleSeed = async () => {
		const usersCount = 3;

		for (let i = 0; i < usersCount; i++) {
			const uid = faker.string.uuid();
			const user = {
				uid,
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				phone: faker.phone.number('+9665########'),
				companyName: faker.company.name(),
				address: `${faker.location.city()}, Saudi Arabia`,
				vatNumber: faker.string.numeric(10),
				crNumber: `CR-${faker.string.numeric(5)}`,
				createdAt: new Date().toISOString(),
			};
			await setUserData(uid, user);

			const clientsCount = faker.number.int({ min: 3, max: 5 });
			for (let j = 0; j < clientsCount; j++) {
				const clientId = faker.string.uuid();
				const client = {
					id: clientId,
					userId: uid,
					name: faker.person.fullName(),
					email: faker.internet.email(),
					phone: faker.phone.number('+9665########'),
					address: `${faker.location.city()}, Saudi Arabia`,
					createdAt: new Date().toISOString(),
				};
				await addData('clients', client);

				const invoicesCount = faker.number.int({ min: 2, max: 4 });
				for (let k = 0; k < invoicesCount; k++) {
					const itemsCount = faker.number.int({ min: 1, max: 5 });
					const items = Array.from({ length: itemsCount }).map(() => {
						const price = faker.number.int({ min: 100, max: 2000 });
						const quantity = faker.number.int({ min: 1, max: 5 });
						return {
							description: faker.commerce.productName(),
							quantity,
							unitPrice: price,
							total: price * quantity,
						};
					});

					const subTotal = items.reduce(
						(sum, item) => sum + item.total,
						0,
					);
					const vat = Math.round(subTotal * 0.15);
					const total = subTotal + vat;
					const status = faker.helpers.arrayElement([
						'unpaid',
						'paid',
						'overdue',
					]);
					const invoiceDate = faker.date.recent({ days: 30 });
					const dueDate = new Date(invoiceDate);
					dueDate.setDate(dueDate.getDate() + 15);

					const invoice = {
						id: faker.string.uuid(),
						userId: uid,
						clientId,
						invoiceNumber: `INV-${faker.date
							.future()
							.getFullYear()}-${faker.string.numeric(3)}`,
						date: invoiceDate.toISOString().split('T')[0],
						dueDate: dueDate.toISOString().split('T')[0],
						status,
						subTotal,
						vat,
						total,
						currency: 'SAR',
						items,
						notes: 'Thank you for your business.',
						createdAt: new Date().toISOString(),
					};

					await addData('invoices', invoice);

					if (invoice.status === 'paid') {
						const paymentDate = new Date(invoice.date);
						paymentDate.setDate(
							paymentDate.getDate() +
								faker.number.int({ min: 1, max: 10 }),
						);
						const payment = {
							id: faker.string.uuid(),
							invoiceId: invoice.id,
							userId: uid,
							amount: invoice.total,
							method: faker.helpers.arrayElement([
								'cash',
								'credit_card',
								'bank_transfer',
							]),
							transactionId: `TX-${faker.string.numeric(6)}`,
							date: paymentDate.toISOString(),
						};
						await addData('payments', payment);
					}
				}
			}
		}

		alert('✅ بيانات Firestore تم توليدها بنجاح!');
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>صفحة توليد بيانات Firestore</h1>
			<p>
				اضغطي على الزر لتوليد بيانات Users, Clients, Invoices و Payments
				للتجربة.
			</p>
			<button
				onClick={handleSeed}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				توليد البيانات
			</button>
		</div>
	);
};

export default SeedPage;
