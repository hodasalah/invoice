import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { addClient } from '@/features/clients/clientsSlice';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddClientModal = ({ open, onClose }: any) => {
	const dispatch = useDispatch<any>();
	const [data, setData] = useState({
		name: '',
		email: '',
		phone: '',
		address: {
			country: '',
			city: '',
			street: '',
			building: '',
			zip: '',
		},
	});

	const handleSubmit = () => {
		dispatch(addClient(data));
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent className={clsx('max-w-lg w-full bg-white')}>
				<DialogHeader>
					<DialogTitle>Add Client</DialogTitle>
				</DialogHeader>

				<div className='grid gap-4'>
					<Input
						placeholder='Name'
						onChange={(e) =>
							setData({ ...data, name: e.target.value })
						}
					/>

					<Input
						placeholder='Email'
						onChange={(e) =>
							setData({ ...data, email: e.target.value })
						}
					/>

					<Input
						placeholder='Phone'
						onChange={(e) =>
							setData({ ...data, phone: e.target.value })
						}
					/>

					{/* ✅ Address Block */}
					<div className='border rounded-xl p-4 bg-muted/30 space-y-3'>
						<h4 className='text-sm font-medium text-muted-foreground'>
							Address Details
						</h4>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
							<Input
								placeholder='Country'
								onChange={(e) =>
									setData({
										...data,
										address: {
											...data.address,
											country: e.target.value,
										},
									})
								}
							/>

							<Input
								placeholder='City'
								onChange={(e) =>
									setData({
										...data,
										address: {
											...data.address,
											city: e.target.value,
										},
									})
								}
							/>

							<Input
								placeholder='Street'
								className='sm:col-span-2'
								onChange={(e) =>
									setData({
										...data,
										address: {
											...data.address,
											street: e.target.value,
										},
									})
								}
							/>

							<Input
								placeholder='Building / Apartment'
								onChange={(e) =>
									setData({
										...data,
										address: {
											...data.address,
											building: e.target.value,
										},
									})
								}
							/>

							<Input
								placeholder='ZIP / Postal Code'
								onChange={(e) =>
									setData({
										...data,
										address: {
											...data.address,
											zip: e.target.value,
										},
									})
								}
							/>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant='outline'
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddClientModal;
