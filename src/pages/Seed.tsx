import { faker } from '@faker-js/faker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfigs/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

const SeedPage = () => {
	const handleSeed = async () => {
		const usersCount = 2; // عدد المستخدمين العاديين

		// --------- 1️⃣ إنشاء admin ثابت ---------
		try {
			const adminEmail = 'hoda@gmail.com';
			const adminPassword = 'admin123';
			const adminUid = 'h38maJ96swN6eltPXAfhvNrFRLy2'; // UID ثابت

			let adminUser;
			try {
				const adminCredential = await createUserWithEmailAndPassword(
					auth,
					adminEmail,
					adminPassword,
				);
				adminUser = adminCredential.user;
			} catch (err: any) {
				console.warn('⚠️ Admin موجود بالفعل، نستخدم UID ثابت');
				adminUser = { uid: adminUid, email: adminEmail };
			}

			const adminData = {
				uid: adminUid,
				firstName: 'Hoda',
				lastName: 'Salah',
				email: adminEmail,
				password: adminPassword, // DEV فقط
				avatar: faker.image.avatar(),
				role: 'admin',
				phone: faker.phone.number('+9665########'),
				companyName: 'Hoda Co.',
				address: `${faker.location.city()}, Saudi Arabia`,
				vatNumber: faker.string.numeric(10),
				crNumber: `CR-${faker.string.numeric(5)}`,
				createdAt: new Date().toISOString(),
			};

			await setDoc(doc(db, 'users', adminUid), adminData);

			// ✅ إنشاء عملاء للـ admin
			for (let j = 0; j < 3; j++) {
				const clientId = (
					await addDoc(collection(db, 'clients'), {
						userId: adminUid,
						name: faker.person.fullName(),
						companyName: faker.company.name(), // ✅ جديد
						email: faker.internet.email(),
						phone: faker.phone.number('+9665########'),
						address: `${faker.location.city()}, Saudi Arabia`,
						currency: 'SAR', // ✅ جديد
						notes: faker.lorem.sentence(), // ✅ جديد
						archived: false, // ✅ جديد
						createdAt: new Date().toISOString(),
					})
				).id;

				const invoicesCount = faker.number.int({ min: 1, max: 3 });
				for (let k = 0; k < invoicesCount; k++) {
					const itemsCount = faker.number.int({ min: 1, max: 5 });

					const items = Array.from({ length: itemsCount }).map(() => {
						const price = faker.number.int({ min: 100, max: 2000 });
						const quantity = faker.number.int({ min: 1, max: 5 });
						return {
							id: faker.string.uuid(),
							description: faker.commerce.productName(),
							quantity,
							unitPrice: price,
							total: price * quantity,
						};
					});

					const subTotal = items.reduce(
						(sum, it) => sum + it.total,
						0,
					);
					const vat = Math.round(subTotal * 0.15);
					const total = subTotal + vat;
					const status = faker.helpers.arrayElement([
						'paid',
						'unpaid',
						'overdue',
					]);

					const invoiceDate = faker.date.recent({ days: 30 });
					const dueDate = new Date(invoiceDate);
					dueDate.setDate(dueDate.getDate() + 15);

					const invoiceId = (
						await addDoc(collection(db, 'invoices'), {
							userId: adminUid,
							clientId,
							invoiceNumber: `INV-${invoiceDate.getFullYear()}-${faker.string.numeric(
								3,
							)}`,
							date: invoiceDate.toISOString().split('T')[0],
							dueDate: dueDate.toISOString().split('T')[0],
							items,
							subTotal,
							vat,
							total,
							status,
							currency: 'SAR',
							notes: 'Thank you for your business',
							createdAt: new Date().toISOString(),
						})
					).id;

					if (status === 'paid') {
						const paymentDate = new Date(invoiceDate);
						paymentDate.setDate(
							paymentDate.getDate() +
								faker.number.int({ min: 1, max: 10 }),
						);

						await addDoc(collection(db, 'payments'), {
							userId: adminUid,
							invoiceId,
							amount: total,
							method: faker.helpers.arrayElement([
								'cash',
								'credit_card',
								'bank_transfer',
							]),
							transactionId: `TX-${faker.string.numeric(6)}`,
							date: paymentDate.toISOString(),
						});
					}
				}
			}
		} catch (err) {
			console.error('❌ Error creating admin:', err);
		}

		// --------- 2️⃣ المستخدمين العاديين ---------
		for (let i = 0; i < usersCount; i++) {
			const email = faker.internet.email();
			const password = faker.internet.password({ length: 10 });

			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password,
				);
				const firebaseUser = userCredential.user;

				const userData = {
					uid: firebaseUser.uid,
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					email: firebaseUser.email,
					password,
					avatar: faker.image.avatar(),
					role: 'user',
					phone: faker.phone.number('+9665########'),
					companyName: faker.company.name(),
					address: `${faker.location.city()}, Saudi Arabia`,
					vatNumber: faker.string.numeric(10),
					crNumber: `CR-${faker.string.numeric(5)}`,
					createdAt: new Date().toISOString(),
				};

				await setDoc(doc(db, 'users', firebaseUser.uid), userData);

				const clientsCount = faker.number.int({ min: 1, max: 3 });
				for (let j = 0; j < clientsCount; j++) {
					const clientId = (
						await addDoc(collection(db, 'clients'), {
							userId: firebaseUser.uid,
							name: faker.person.fullName(),
							companyName: faker.company.name(), // ✅ جديد
							email: faker.internet.email(),
							phone: faker.phone.number('+9665########'),
							address: `${faker.location.city()}, Saudi Arabia`,
							currency: 'SAR', // ✅ جديد
							notes: faker.lorem.sentence(), // ✅ جديد
							archived: false, // ✅ جديد
							createdAt: new Date().toISOString(),
						})
					).id;

					const invoicesCount = faker.number.int({ min: 1, max: 3 });
					for (let k = 0; k < invoicesCount; k++) {
						const itemsCount = faker.number.int({ min: 1, max: 5 });
						const items = Array.from({ length: itemsCount }).map(
							() => {
								const price = faker.number.int({
									min: 100,
									max: 2000,
								});
								const quantity = faker.number.int({
									min: 1,
									max: 5,
								});
								return {
									id: faker.string.uuid(),
									description: faker.commerce.productName(),
									quantity,
									unitPrice: price,
									total: price * quantity,
								};
							},
						);

						const subTotal = items.reduce(
							(sum, it) => sum + it.total,
							0,
						);
						const vat = Math.round(subTotal * 0.15);
						const total = subTotal + vat;
						const status = faker.helpers.arrayElement([
							'paid',
							'unpaid',
							'overdue',
						]);

						const invoiceDate = faker.date.recent({ days: 30 });
						const dueDate = new Date(invoiceDate);
						dueDate.setDate(dueDate.getDate() + 15);

						const invoiceId = (
							await addDoc(collection(db, 'invoices'), {
								userId: firebaseUser.uid,
								clientId,
								invoiceNumber: `INV-${invoiceDate.getFullYear()}-${faker.string.numeric(
									3,
								)}`,
								date: invoiceDate.toISOString().split('T')[0],
								dueDate: dueDate.toISOString().split('T')[0],
								items,
								subTotal,
								vat,
								total,
								status,
								currency: 'SAR',
								notes: 'Auto-generated invoice',
								createdAt: new Date().toISOString(),
							})
						).id;

						if (status === 'paid') {
							const paymentDate = new Date(invoiceDate);
							paymentDate.setDate(
								paymentDate.getDate() +
									faker.number.int({ min: 1, max: 10 }),
							);

							await addDoc(collection(db, 'payments'), {
								userId: firebaseUser.uid,
								invoiceId,
								amount: total,
								method: faker.helpers.arrayElement([
									'cash',
									'credit_card',
									'bank_transfer',
								]),
								transactionId: `TX-${faker.string.numeric(6)}`,
								date: paymentDate.toISOString(),
							});
						}
					}
				}
			} catch (error) {
				console.error('❌ Error creating user:', error);
			}
		}

		alert(
			'✅ تم إنشاء admin + مستخدمين + بيانات clients/invoices/payments (مع الحقول الجديدة)',
		);
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>🚀 Seed Database</h1>
			<p>اضغطي لتوليد admin ومستخدمين تجريبيين مع بياناتهم كاملة.</p>
			<button
				onClick={handleSeed}
				className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
			>
				توليد البيانات
			</button>
		</div>
	);
};

export default SeedPage;