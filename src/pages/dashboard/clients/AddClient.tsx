// src/pages/clients/AddClientPage.tsx

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addClient } from '@/features/clients/clientsSlice';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const AddClient = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state: RootState) => state.user.currentUser);

	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		address: {
			country: '',
			city: '',
			street: '',
			state: '',
			zip: '',
		},
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		phone: '',
		country: '',
		city: '',
		street: '',
		state: '',
		zip: '',
	});

	// ✅ التحقق من صحة البيانات
	const validate = () => {
		let valid = true;
		const newErrors: Record<string, string> = {};

		if (!form.name.trim()) {
			newErrors.name = 'الاسم مطلوب';
			valid = false;
		}

		if (!form.email.trim()) {
			newErrors.email = 'البريد مطلوب';
			valid = false;
		}

		if (!form.phone.trim()) {
			newErrors.phone = 'رقم الهاتف مطلوب';
			valid = false;
		}

		if (!form.address.country.trim()) {
			newErrors.country = 'البلد مطلوب';
			valid = false;
		}

		if (!form.address.city.trim()) {
			newErrors.city = 'المدينة مطلوبة';
			valid = false;
		}

		if (!form.address.street.trim()) {
			newErrors.street = 'الشارع مطلوب';
			valid = false;
		}

		if (!form.address.state.trim()) {
			newErrors.state = 'الولاية مطلوبة';
			valid = false;
		}

		if (!form.address.zip.trim()) {
			newErrors.zip = 'الرمز البريدي مطلوب';
			valid = false;
		}

		setErrors({ ...errors, ...newErrors });
		return valid;
	};

	// ✅ حفظ البيانات
	const handleSubmit = async () => {
		if (!validate()) return;
		try {
			await dispatch(
				addClient({
					...form,
					userId: user.uid,
				}),
			).unwrap();

			toast.success('تم إضافة العميل بنجاح ✅');

			navigate('/dashboard/clients/list');
		} catch {
			toast.error('حدث خطأ أثناء الإضافة ❌');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// name could be "address.country"
		if (name.startsWith('address.')) {
			const key = name.split('.')[1];

			setForm((prev) => ({
				...prev,
				address: { ...prev.address, [key]: value },
			}));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	return (
		<div className='max-w-2xl mx-auto mt-6 '>
			<Card className='p-6 shadow-md '>
				<h2 className='text-xl font-bold mb-4'>إضافة عميل جديد</h2>

				<div className='space-y-4'>
					{/* الاسم */}
					<div>
						<Label>اسم العميل</Label>
						<Input
							name='name'
							value={form.name}
							onChange={handleChange}
							placeholder='أدخل اسم العميل'
						/>
						{errors.name && (
							<p className='text-red-500 text-sm'>
								{errors.name}
							</p>
						)}
					</div>
					{/* البريد */}
					<div>
						<Label>البريد الإلكتروني</Label>
						<Input
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder='example@gmail.com'
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>
								{errors.email}
							</p>
						)}
					</div>
					{/* الهاتف */}
					<div>
						<Label>رقم الهاتف</Label>
						<Input
							name='phone'
							value={form.phone}
							onChange={handleChange}
							placeholder='05xxxxxxxx'
						/>
						{errors.phone && (
							<p className='text-red-500 text-sm'>
								{errors.phone}
							</p>
						)}
					</div>
					{/* العنوان */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<Label>البلد</Label>
							<Input
								name='address.country'
								value={form.address.country}
								onChange={handleChange}
								placeholder='مثال: السعودية'
							/>
						</div>

						<div>
							<Label>المدينة</Label>
							<Input
								name='address.city'
								value={form.address.city}
								onChange={handleChange}
								placeholder='مثال: الرياض'
							/>
						</div>

						<div>
							<Label>الشارع</Label>
							<Input
								name='address.street'
								value={form.address.street}
								onChange={handleChange}
								placeholder='اسم الشارع'
							/>
						</div>

						<div>
							<Label>الولاية</Label>
							<Input
								name='address.state'
								value={form.address.state}
								onChange={handleChange}
								placeholder='اسم الولاية'
							/>
							{errors.state && (
								<p className='text-red-500 text-sm'>
									{errors.state}
								</p>
							)}
						</div>

						<div>
							<Label>الرمز البريدي</Label>
							<Input
								name='address.zip'
								value={form.address.zip}
								onChange={handleChange}
								placeholder='الرمز البريدي'
							/>
							{errors.zip && (
								<p className='text-red-500 text-sm'>
									{errors.zip}
								</p>
							)}
						</div>
					</div>

					<Button
						onClick={handleSubmit}
						className='w-full mt-4'
					>
						حفظ العميل
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default AddClient;
