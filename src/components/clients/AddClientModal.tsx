import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addClient } from '@/features/clients/clientsSlice';

const AddClientModal = ({ open, onClose }: any) => {
	const dispatch = useDispatch<any>();
	const [data, setData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
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
			<DialogContent>
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
					<Input
						placeholder='Address'
						onChange={(e) =>
							setData({ ...data, address: e.target.value })
						}
					/>
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
