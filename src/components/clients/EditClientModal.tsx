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

	useEffect(() => {
		if (client) setFormData(client);
	}, [client]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		onUpdate(formData);
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
						name='address'
						defaultValue={formData?.address}
						onChange={handleChange}
						placeholder='Address'
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
