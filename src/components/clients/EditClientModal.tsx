import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateClient } from '@/features/clients/clientsSlice';

interface EditClientModalProps {
	open: boolean;
	onClose: () => void;
	client: any;
	onUpdate: (data: any) => void;
}

export default function EditClientModal({
	open,
	onClose,
	client,
	onUpdate,
}: EditClientModalProps) {
	const [formData, setFormData] = useState<any>({});
const dispatch=useAppDispatch()
	useEffect(() => {
		if (client) setFormData(client);
	}, [client]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.name==='country' || e.target.name==='city' || e.target.name==='street' || e.target.name==='zip' || e.target.name==='state' || e.target.name==='building'){
			setFormData({
				...formData,
				address: {
					...formData.address,
					[e.target.name]: e.target.value,
				},
			});
		}else{
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const handleSave = () => {
		dispatch(updateClient({id:client.id,data:formData}));
		onUpdate(formData);
		console.log('Updated client data:', formData);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent
				aria-describedby={undefined}
				className='sm:max-w-[480px] bg-white backdrop-blur-xl border border-border shadow-xl'
			>
				<DialogHeader>
					<DialogTitle>Edit Client</DialogTitle>
					<DialogDescription>
						Update client details.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-3 py-2'>
					<Input
						name='name'
						defaultValue={formData?.name}
						onChange={handleChange}
						placeholder='Client name'
					/>
					<Input
						name='email'
						defaultValue={formData?.email}
						onChange={handleChange}
						placeholder='Email'
					/>
					<Input
						name='phone'
						defaultValue={formData?.phone}
						onChange={handleChange}
						placeholder='Phone'
					/>

					<Input
						name='country'
						defaultValue={formData?.address?.country}
						onChange={handleChange}
						placeholder='Country'
					/>
					<Input
						name='city'
						defaultValue={formData?.address?.city}
						onChange={handleChange}
						placeholder='City'
					/>
					<Input
						name='street'
						defaultValue={formData?.address?.street}
						onChange={handleChange}
						placeholder='Street'
					/>
					<Input
						name='state'
						defaultValue={formData?.address?.state}
						onChange={handleChange}
						placeholder='State'
					/>
					<Input
						name='building'
						defaultValue={formData?.address?.building}
						onChange={handleChange}
						placeholder='Building'
					/>
					<Input
						name='zip'
						defaultValue={formData?.address?.zip}
						onChange={handleChange}
						placeholder='Zip Code'
					/>
				</div>

				<DialogFooter>
					<Button
						variant='outline'
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button onClick={handleSave}>Update</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

