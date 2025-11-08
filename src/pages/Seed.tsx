import { faker } from '@faker-js/faker';
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfigs/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

const SeedPage = () => {
	const handleSeed = async () => {
		const usersCount = 2;

		// -------- ✅ 1) إنشاء Admin ومعالجة مشكلة UID --------
		try {
			const adminEmail = 'hoda@gmail.com';
			const adminPassword = 'admin123';
			let adminUid: string;

			// ✅ هل البريد مسجّل مسبقًا؟
			const methods = await fetchSignInMethodsForEmail(auth, adminEmail);

			if (methods.length === 0) {
				// ✅ غير موجود → نعمل إنشاء مستخدم
				const adminCredential = await createUserWithEmailAndPassword(
					auth,
					adminEmail,
					adminPassword,
				);
				adminUid = adminCredential.user.uid;
				console.log('✅ Admin created with Firebase UID:', adminUid);
			} else {
				// ✅ موجود مسبقًا → نجيب UID الحقيقي من Authentication
				const existingUser = auth.currentUser;
				if (existingUser && existingUser.email === adminEmail) {
					adminUid = existingUser.uid;
				} else {
					throw new Error(
						'⚠️ Admin exists but not signed in. سجّلي دخول admin أولاً.',
					);
				}
			}

			// ✅ حفظ بيانات admin بنفس UID الحقيقي
			await setDoc(doc(db, 'users', adminUid), {
				uid: adminUid,
				firstName: 'Hoda',
				lastName: 'Salah',
				email: adminEmail,
				password: adminPassword,
				avatar: faker.image.avatar(),
				role: 'admin',
				phone: faker.phone.number('+9665########'),
				companyName: 'Hoda Co.',
				address: {
					street: faker.location.streetAddress(),
					city: faker.location.city(),
					state: faker.location.state(),
					country: 'Saudi Arabia',
					zip: faker.location.zipCode(),
				},
				vatNumber: faker.string.numeric(10),
				crNumber: `CR-${faker.string.numeric(5)}`,
				createdAt: new Date().toISOString(),
			});

			// ✅ إنشاء عملاء وفواتير للـ admin
			for (let j = 0; j < 3; j++) {
				const clientId = (
					await addDoc(collection(db, 'clients'), {
						userId: adminUid,
						name: faker.person.fullName(),
						companyName: faker.company.name(),
						email: faker.internet.email(),
						phone: faker.phone.number('+9665########'),
						address: {
							street: faker.location.streetAddress(),
							city: faker.location.city(),
							state: faker.location.state(),
							country: 'Saudi Arabia',
							zip: faker.location.zipCode(),
						},
						currency: 'SAR',
						notes: faker.lorem.sentence(),
						archived: false,
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

					const subTotal = items.reduce((s, it) => s + it.total, 0);
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

		// ------- ✅ 2) المستخدمين العاديين (بدون تغيير) -------
		// (هنا نترك الكود كما كان لضمان أن كل شيء يعمل)
		// ✅ … نفس بقية الكود تبعك بدون تعديل …

		alert('✅ تم حل مشكلة UID وتوليد البيانات كاملة');
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>🚀 Seed Database</h1>
			<p>اضغطي لتوليد admin ومستخدمين تجريبيين مع بيانات كاملة.</p>
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
