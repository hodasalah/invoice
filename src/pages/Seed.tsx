import { setUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfigs/firebase';

const SeedPage = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user.currentUser);

	const handleMakeMeAdmin = async () => {
		const firebaseUser = auth.currentUser;
		if (!firebaseUser) {
			alert('⚠️ Please login first.');
			return;
		}
		try {
			await updateDoc(doc(db, 'users', firebaseUser.uid), { role: 'admin' });
			if (currentUser) {
				const updated = { ...currentUser, role: 'admin' };
				dispatch(setUser(updated));
			}
			alert('✅ Your role has been updated to admin! You can now delete invoices.');
		} catch (err) {
			console.error('Error updating role:', err);
			alert('❌ Failed to update role. Check console.');
		}
	};

	const handleSeed = async () => {
		const firebaseUser = auth.currentUser;
		if (!firebaseUser) {
			alert('⚠️ الرجاء تسجيل الدخول أولاً لتوليد البيانات لحسابك الحالي.');
			return;
		}

		try {
			const adminUid = firebaseUser.uid;
			const adminEmail = firebaseUser.email || 'user@example.com';

			// كائنات لتجميع القيم وحسابها ديناميكياً بدلاً من الـ Hardcoding
			let totalPaidInvoices = 0;
			let totalUnpaidInvoices = 0;
			const generatedInvoices = [];
			const generatedPayments = [];

			// 1. توليد بيانات العملاء والفواتير والمدفوعات أولاً في الـ Memory لحساب الإجماليات
			for (let j = 0; j < 3; j++) {
				const clientData = {
					userId: adminUid,
					name: faker.person.fullName(),
					companyName: faker.company.name(),
					email: faker.internet.email(),
					phone: faker.phone.number({ style: 'national' }),
					address: {
						street: faker.location.streetAddress(),
						city: faker.location.city(),
						state: faker.location.state(),
						country: 'Saudi Arabia',
						zip: faker.location.zipCode(),
					},
					currency: 'USD', // ✅ تم توحيد العملة مع الفاتورة لتصبح USD
					notes: faker.lorem.sentence(),
					archived: false,
					createdAt: new Date().toISOString(),
				};

				const invoicesCount = faker.number.int({ min: 1, max: 3 });
				const clientInvoices = [];

				for (let k = 0; k < invoicesCount; k++) {
					const itemsCount = faker.number.int({ min: 1, max: 5 });
					const items = Array.from({ length: itemsCount }).map(() => {
						const price = faker.number.int({ min: 100, max: 2000 });
						const quantity = faker.number.int({ min: 1, max: 5 });
						return {
							id: faker.string.uuid(),
							description: faker.commerce.productName(),
							quantity,
							price,
							total: price * quantity,
						};
					});

					const subTotal = items.reduce((s, it) => s + it.total, 0);
					const vat = Math.round(subTotal * 0.15);
					const total = subTotal + vat;
					const status = faker.helpers.arrayElement([ 'paid', 'unpaid' ]);

					if (status === 'paid') {
						totalPaidInvoices += total;
					} else {
						totalUnpaidInvoices += total;
					}

					const invoiceDate = faker.date.recent({ days: 30 });
					const dueDate = new Date(invoiceDate);
					dueDate.setDate(dueDate.getDate() + 15);

					clientInvoices.push({
						invoiceData: {
							userId: adminUid,
							clientName: clientData.name,
							clientEmail: clientData.email,
							clientPhone: clientData.phone,
							clientAddress: clientData.address,
							invoiceNumber: `INV-${invoiceDate.getFullYear()}-${faker.string.numeric(3)}`,
							date: invoiceDate.toISOString().split('T')[ 0 ],
							dueDate: dueDate.toISOString().split('T')[ 0 ],
							items,
							subTotal,
							vat,
							total,
							status,
							currency: 'USD',
							notes: 'Thank you for your business',
							createdAt: new Date().toISOString(),
						},
						status,
						invoiceDate
					});
				}

				generatedInvoices.push({ clientData, clientInvoices });
			}

			// 2. رفع بيانات الـ Admin User إلى Firestore
			await setDoc(doc(db, 'users', adminUid), {
				uid: adminUid,
				firstName: 'Admin',
				lastName: 'User',
				email: adminEmail,
				avatar: faker.image.avatar(),
				role: 'admin',
				phone: faker.phone.number({ style: 'national' }),
				companyName: 'My Awesome Co.',
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

			// 3. رفع المحفظة والتحليلات بناءً على الحسابات الديناميكية للفواتير المدفوعة
			await setDoc(doc(db, 'wallets', adminUid), {
				total_balance: totalPaidInvoices, // ✅ الرصيد الحالي يساوي الفواتير المدفوعة فعلياً
				currency: 'USD',
				last_updated: '11 April 2025',
				monthly_income: {
					amount: totalPaidInvoices, // ✅ الإيرادات ديناميكية ومطابقة
					change_percentage: 2.5
				},
				monthly_expense: {
					amount: totalUnpaidInvoices, // ✅ الفواتير غير المدفوعة تمثل التزامات/مصاريف متوقعة
					change_percentage: -8.0
				},
				monthly_savings: {
					amount: Math.round(totalPaidInvoices * 0.35),
					change_percentage: 8.5
				},
				total_savings: Math.round(totalPaidInvoices * 1.5),
				targets: [
					{
						target_id: 'target_married',
						title: 'Married',
						current_amount: 6560.11,
						achieved_percentage: 11
					},
					{
						target_id: 'target_home',
						title: 'Home',
						current_amount: 33159.15,
						achieved_percentage: 25
					}
				],
				currencies: [
					{ code: 'USD', value: 56476.00 }, // ✅ تم تعديل الكود إلى صيغة قياسية ثلاثية 
					{ code: 'EUR', value: 49973.67 },
					{ code: 'GBP', value: 45098.56 }
				]
			});

			// 4. رفع بطاقات الفيزا الفرعية (Cards Subcollection)
			await setDoc(doc(db, 'wallets', adminUid, 'cards', 'card_01'), {
				card_id: 'card_01',
				type: 'VISA',
				card_number: '5294 2436 4780 9568',
				balance: Math.round(totalPaidInvoices * 0.6), // ديناميكي بناءً على الرصيد الكلي
				expiry_date: '12/26',
				theme: 'green'
			});

			await setDoc(doc(db, 'wallets', adminUid, 'cards', 'card_02'), {
				card_id: 'card_02',
				type: 'VISA',
				card_number: '6391 1827 3340 7712',
				balance: Math.round(totalPaidInvoices * 0.4), // ديناميكي بناءً على الرصيد الكلي
				expiry_date: '09/27',
				theme: 'dark_blue'
			});

			// 5. رفع العملاء وفواتيرهم ومدفوعاتهم بشكل متتابع لضمان الحصول على الـ IDs الصحيحة
			for (const group of generatedInvoices) {
				const clientId = (await addDoc(collection(db, 'clients'), group.clientData)).id;

				for (const invoiceWrapper of group.clientInvoices) {
					// إضافة الـ clientId للفاتورة قبل الرفع
					const completeInvoiceData = {
						...invoiceWrapper.invoiceData,
						clientId: clientId
					};

					const invoiceId = (await addDoc(collection(db, 'invoices'), completeInvoiceData)).id;

					// إذا كانت الفاتورة مدفوعة، نقوم بإنشاء عملية الدفع وربطها بالـ invoiceId
					if (invoiceWrapper.status === 'paid') {
						const paymentDate = new Date(invoiceWrapper.invoiceDate);
						paymentDate.setDate(paymentDate.getDate() + faker.number.int({ min: 1, max: 10 }));

						await addDoc(collection(db, 'payments'), {
							userId: adminUid,
							invoiceId: invoiceId, // ✅ الربط الصحيح بالفاتورة
							amount: completeInvoiceData.total,
							method: faker.helpers.arrayElement([ 'cash', 'credit_card', 'bank_transfer' ]),
							transactionId: `TX-${faker.string.numeric(6)}`,
							date: paymentDate.toISOString(),
						});
					}
				}
			}

			alert('✅ تم توليد البيانات كاملة ومطابقتها لقواعد البيزنس بنجاح!');
		} catch (err) {
			console.error('❌ Error creating admin data:', err);
			alert('❌ فشل توليد البيانات، تفحص الـ Console لمشاهدة الخطأ.');
		}
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>🚀 Seed Database</h1>

			<div style={{ marginBottom: 24, padding: 16, border: '2px solid #16a34a', borderRadius: 8, background: '#f0fdf4' }}>
				<h2 style={{ color: '#15803d', marginBottom: 8 }}>👑 Make Me Admin</h2>
				<p style={{ color: '#166534', marginBottom: 12, fontSize: 14 }}>
					Click below to instantly set your account role to <strong>admin</strong>.
					This will allow you to delete invoices. Takes effect immediately without re-login.
				</p>
				<button
					onClick={handleMakeMeAdmin}
					style={{
						padding: '10px 24px',
						background: '#16a34a',
						color: 'white',
						border: 'none',
						borderRadius: 6,
						cursor: 'pointer',
						fontWeight: 'bold',
						fontSize: 16,
					}}
				>
					👑 Make Me Admin Now
				</button>
			</div>

			<p>اضغطي لتوليد admin ومستخدمين تجريبيين مع بيانات كاملة متناسقة ماليًا.</p>
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
