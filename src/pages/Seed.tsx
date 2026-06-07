import { setUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { faker } from '@faker-js/faker';
import { collection, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../firebaseConfigs/firebase';

const SeedPage = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const [isSeeding, setIsSeeding] = useState(false);

	const handleMakeMeAdmin = async () => {
		const firebaseUser = auth.currentUser;
		if (!firebaseUser) {
			alert('⚠️ Please login first.');
			return;
		}
		try {
			await updateDoc(doc(db, 'users', firebaseUser.uid), {
				role: 'admin',
			});
			if (currentUser) {
				const updated = { ...currentUser, role: 'admin' };
				dispatch(setUser(updated));
			}
			alert(
				'✅ Your role has been updated to admin! You can now delete invoices.',
			);
		} catch (err) {
			console.error('Error updating role:', err);
			alert('❌ Failed to update role. Check console.');
		}
	};

	const handleSeed = async () => {
		const firebaseUser = auth.currentUser;
		if (!firebaseUser) {
			alert(
				'⚠️ الرجاء تسجيل الدخول أولاً لتوليد البيانات لحسابك الحالي.',
			);
			return;
		}

		setIsSeeding(true);

		try {
			// تهيئة الـ Write Batch لضمان السرعة والاتساق الذري في الطلبات
			const batch = writeBatch(db);

			const adminUid = firebaseUser.uid;
			const adminEmail = firebaseUser.email || 'user@example.com';

			let totalPaidInvoices = 0;
			let totalUnpaidInvoices = 0;
			const generatedInvoices = [];

			// 1. حلقة التوليد المسبق للعملاء والفواتير
			for (let j = 0; j < 4; j++) {
				const clientRef = doc(collection(db, 'clients'));

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
					currency: 'USD',
					notes: faker.lorem.sentence(),
					archived: false,
					createdAt: new Date().toISOString(),
				};

				const invoicesCount = faker.number.int({ min: 2, max: 4 });
				const clientInvoices = [];

				for (let k = 0; k < invoicesCount; k++) {
					const itemsCount = faker.number.int({ min: 1, max: 4 });
					const items = Array.from({ length: itemsCount }).map(() => {
						const price = faker.number.int({ min: 100, max: 1500 });
						const quantity = faker.number.int({ min: 1, max: 4 });
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

					let status = faker.helpers.arrayElement([
						'paid',
						'unpaid',
						'overdue',
					]);

					if (status === 'paid') {
						totalPaidInvoices += total;
					} else {
						totalUnpaidInvoices += total;
					}

					const invoiceDate = faker.date.recent({ days: 45 });
					const dueDate = new Date(invoiceDate);
					dueDate.setDate(dueDate.getDate() + 15);

					if (status === 'unpaid' && dueDate < new Date()) {
						status = 'overdue';
					}

					const invoiceRef = doc(collection(db, 'invoices'));

					clientInvoices.push({
						invoiceRef,
						invoiceData: {
							userId: adminUid,
							clientId: clientRef.id,
							clientName: clientData.name,
							clientEmail: clientData.email,
							clientPhone: clientData.phone,
							clientAddress: clientData.address,
							invoiceNumber: `INV-${invoiceDate.getFullYear()}-${faker.string.numeric(4)}`,
							date: invoiceDate.toISOString().split('T')[0],
							dueDate: dueDate.toISOString().split('T')[0],
							items,
							subTotal,
							vat,
							total,
							status,
							currency: 'USD',
							notes: 'Thank you for your valued business.',
							createdAt: new Date().toISOString(),
						},
						status,
						invoiceDate,
						total,
					});
				}

				generatedInvoices.push({
					clientRef,
					clientData,
					clientInvoices,
				});
			}

			// تحديث بيانات المستخدم الحالي كـ Admin
			const userRef = doc(db, 'users', adminUid);
			batch.set(userRef, {
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
				vatNumber: faker.string.numeric(15),
				crNumber: `CR-${faker.string.numeric(7)}`,
				createdAt: new Date().toISOString(),
			});

			// إعداد بيانات المحفظة المالية والعملات
			const walletRef = doc(db, 'wallets', adminUid);
			batch.set(walletRef, {
				total_balance: totalPaidInvoices,
				currency: 'USD',
				last_updated: new Date().toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				}),
				monthly_income: {
					amount: totalPaidInvoices,
					change_percentage: 4.8,
				},
				monthly_expense: {
					amount: totalUnpaidInvoices,
					change_percentage: -2.1,
				},
				monthly_savings: {
					amount: Math.round(totalPaidInvoices * 0.3),
					change_percentage: 5.2,
				},
				total_savings: Math.round(totalPaidInvoices * 1.2),
				targets: [
					{
						target_id: 'target_married',
						title: 'Married Asset Pool',
						current_amount: 8400.0,
						achieved_percentage: 15,
					},
					{
						target_id: 'target_home',
						title: 'Commercial HQ Fund',
						current_amount: 45000.0,
						achieved_percentage: 30,
					},
				],
				currencies: [
					{ code: 'USD', value: totalPaidInvoices },
					{
						code: 'EUR',
						value: Math.round(totalPaidInvoices * 0.92),
					},
					{
						code: 'SAR',
						value: Math.round(totalPaidInvoices * 3.75),
					},
				],
			});

			// إعداد بطاقات الـ Visa والمحفظة
			const card1Ref = doc(db, 'wallets', adminUid, 'cards', 'card_01');
			batch.set(card1Ref, {
				card_id: 'card_01',
				type: 'VISA',
				card_number: '5294 2436 4780 9568',
				balance: Math.round(totalPaidInvoices * 0.65),
				expiry_date: '08/29',
				theme: 'green',
			});

			const card2Ref = doc(db, 'wallets', adminUid, 'cards', 'card_02');
			batch.set(card2Ref, {
				card_id: 'card_02',
				type: 'MASTERCARD',
				card_number: '6391 1827 3340 7712',
				balance: Math.round(totalPaidInvoices * 0.35),
				expiry_date: '11/30',
				theme: 'dark_blue',
			});

			// 2. إدخال العملاء، الفواتير، المدفوعات، وتوليد كوليكشن الـ Notifications بشكل فوري
			for (const group of generatedInvoices) {
				batch.set(group.clientRef, group.clientData);

				const messageDate = faker.date.recent({ days: 10 });
				const clientMessageRef = doc(collection(db, 'messages'));
				batch.set(clientMessageRef, {
					userId: adminUid,
					clientId: group.clientRef.id,
					clientName: group.clientData.name,
					body: faker.helpers.arrayElement([
						'Could you please confirm the invoice details before payment?',
						'We reviewed the invoice and need a small update on the due date.',
						'Payment is scheduled this week. Please keep us posted.',
					]),
					sender: 'client',
					createdAt: messageDate.toISOString(),
					isRead: faker.helpers.arrayElement([true, false]),
				});

				const userReplyDate = new Date(messageDate);
				userReplyDate.setHours(userReplyDate.getHours() + faker.number.int({ min: 1, max: 12 }));
				const userMessageRef = doc(collection(db, 'messages'));
				batch.set(userMessageRef, {
					userId: adminUid,
					clientId: group.clientRef.id,
					clientName: group.clientData.name,
					body: faker.helpers.arrayElement([
						'Thanks for the update. I will review it and send the final copy shortly.',
						'I updated the invoice details and attached the latest version.',
						'Confirmed. Let me know once the payment has been processed.',
					]),
					sender: 'user',
					createdAt: userReplyDate.toISOString(),
					isRead: true,
				});

				for (const inv of group.clientInvoices) {
					batch.set(inv.invoiceRef, inv.invoiceData);

					// تحديد تواريخ مخصصة للإشعارات والمدفوعات
					const eventDate = new Date(inv.invoiceDate);

					// إشعار إنشاء الفاتورة الافتراضي
					let notiTitleEn = `New invoice ${inv.invoiceData.invoiceNumber} created for ${group.clientData.companyName}`;
					let notiTitleAr = `تم إنشاء فاتورة جديدة رقم ${inv.invoiceData.invoiceNumber} لصالح شركة ${group.clientData.companyName}`;
					let currentType = 'unpaid';

					if (inv.status === 'paid') {
						currentType = 'paid';
						eventDate.setDate(
							eventDate.getDate() +
								faker.number.int({ min: 1, max: 7 }),
						);

						notiTitleEn = `Payment received successfully from ${group.clientData.companyName}`;
						notiTitleAr = `تم استلام الدفعة المالية بنجاح من شركة ${group.clientData.companyName}`;

						const paymentRef = doc(collection(db, 'payments'));
						batch.set(paymentRef, {
							userId: adminUid,
							invoiceId: inv.invoiceRef.id,
							amount: inv.total,
							method: faker.helpers.arrayElement([
								'cash',
								'credit_card',
								'bank_transfer',
							]),
							transactionId: `TX-${faker.string.numeric(7)}`,
							date: eventDate.toISOString(),
						});
					} else if (inv.status === 'overdue') {
						currentType = 'overdue';
						eventDate.setDate(eventDate.getDate() + 15); // حدث بعد انتهاء تاريخ الاستحقاق

						notiTitleEn = `Invoice ${inv.invoiceData.invoiceNumber} for ${group.clientData.companyName} is now overdue!`;
						notiTitleAr = `الفاتورة رقم ${inv.invoiceData.invoiceNumber} لشركة ${group.clientData.companyName} متأخرة عن السداد!`;
					}

					// 🔔 إضافة إشعار ديناميكي مرتبط بالفاتورة الحالية داخل الكوليكشن الجديد
					const notificationRef = doc(
						collection(db, 'notifications'),
					);
					batch.set(notificationRef, {
						userId: adminUid,
						invoiceId: inv.invoiceRef.id,
						invoiceNumber: inv.invoiceData.invoiceNumber,
						clientName: group.clientData.name,
						companyName: group.clientData.companyName,
						amount: inv.total,
						currency: 'USD',
						type: currentType, // paid | unpaid | overdue
						titleEn: notiTitleEn,
						titleAr: notiTitleAr,
						isRead: faker.helpers.arrayElement([true, false]), // عشوائي لاختبار فلاتر المقروء وغير المقروء
						createdAt: eventDate.toISOString(),
					});
				}
			}

			// تنفيذ جميع العمليات معاً دفعة واحدة كطلب شبكة مفرد
			await batch.commit();
			alert(
				'✅ تم توليد البيانات كاملة وإنشاء كوليكشن الإشعارات والرسائل بنجاح مالي تام!',
			);
		} catch (err) {
			console.error('❌ Error creating seeded database structures:', err);
			alert(
				'❌ فشل توليد البيانات، تفحص الـ Console لمشاهدة تفاصيل الخطأ.',
			);
		} finally {
			setIsSeeding(false);
		}
	};

	return (
		<div className='p-8 max-w-2xl mx-auto space-y-6'>
			<h1 className='text-3xl font-bold tracking-tight text-slate-900'>
				🚀 Seed Database
			</h1>

			<div className='p-5 border-2 border-emerald-500 rounded-xl bg-emerald-50/50 space-y-3'>
				<h2 className='text-lg font-bold text-emerald-800 flex items-center gap-2'>
					👑 Make Me Admin
				</h2>
				<p className='text-sm text-emerald-700 leading-relaxed'>
					Click below to instantly set your account role to{' '}
					<strong>admin</strong>. This updates your profile
					permissions to delete invoices dynamically without logging
					out.
				</p>
				<button
					onClick={handleMakeMeAdmin}
					className='px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm'
				>
					👑 Make Me Admin Now
				</button>
			</div>

			<div className='p-5 border border-slate-200 rounded-xl bg-white space-y-4 shadow-sm'>
				<p className='text-sm text-slate-600'>
					اضغط هنا لتوليد بيانات مستخدمين تجريبيين كاملة ومتناسقة
					ماليًا وإنشاء كوليكشن التنبيهات المرتبط بها (Clients,
					Invoices, Cards, Payments, Notifications).
				</p>
				<button
					onClick={handleSeed}
					disabled={isSeeding}
					className={`w-full sm:w-auto px-5 py-2.5 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm ${
						isSeeding
							? 'bg-slate-400 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700'
					}`}
				>
					{isSeeding
						? 'جاري توليد البيانات والرسائل...'
						: 'توليد البيانات'}
				</button>
			</div>
		</div>
	);
};

export default SeedPage;
