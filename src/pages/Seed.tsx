import { faker } from '@faker-js/faker';
import { auth, db } from '../firebaseConfigs/firebase';
import { doc, setDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/features/user/userSlice';

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
			// Update local redux state so change takes effect immediately without re-login
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
					currency: 'SAR',
					notes: faker.lorem.sentence(),
					archived: false,
					createdAt: new Date().toISOString(),
				};
				const clientId = (await addDoc(collection(db, 'clients'), clientData)).id;

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
							price,
							total: price * quantity,
						};
					});

					const subTotal = items.reduce((s, it) => s + it.total, 0);
					const vat = Math.round(subTotal * 0.15);
					const total = subTotal + vat;
					const status = faker.helpers.arrayElement(['paid', 'unpaid']);

					const invoiceDate = faker.date.recent({ days: 30 });
					const dueDate = new Date(invoiceDate);
					dueDate.setDate(dueDate.getDate() + 15);

					const invoiceId = (
						await addDoc(collection(db, 'invoices'), {
							userId: adminUid,
							clientId,
							clientName: clientData.name,
							clientEmail: clientData.email,
							clientPhone: clientData.phone,
							clientAddress: clientData.address,
							invoiceNumber: `INV-${invoiceDate.getFullYear()}-${faker.string.numeric(3)}`,
							date: invoiceDate.toISOString().split('T')[0],
							dueDate: dueDate.toISOString().split('T')[0],
							items,
							subTotal,
							vat,
							total,
							status,
							currency: 'USD',
							notes: 'Thank you for your business',
							createdAt: new Date().toISOString(),
						})
					).id;

					if (status === 'paid') {
						const paymentDate = new Date(invoiceDate);
						paymentDate.setDate(paymentDate.getDate() + faker.number.int({ min: 1, max: 10 }));
						await addDoc(collection(db, 'payments'), {
							userId: adminUid,
							invoiceId,
							amount: total,
							method: faker.helpers.arrayElement(['cash', 'credit_card', 'bank_transfer']),
							transactionId: `TX-${faker.string.numeric(6)}`,
							date: paymentDate.toISOString(),
						});
					}
				}
			}
		} catch (err) {
			console.error('❌ Error creating admin:', err);
		}

		alert('✅ تم حل مشكلة UID وتوليد البيانات كاملة');
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>🚀 Seed Database</h1>

			{/* ✅ Make Me Admin */}
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
