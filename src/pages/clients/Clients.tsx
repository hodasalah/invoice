import AddClientModal from '@/components/clients/AddClientModal';
import EditClientModal from '@/components/clients/EditClientModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	deleteClient,
	fetchClientsByUser,
} from '@/features/clients/clientsSlice';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const Clients = () => {
	const dispatch = useAppDispatch<any>();
	const clients= useAppSelector(
		(state: RootState) => state.clients.list,
	);

	const [search, setSearch] = useState('');
	const [openAdd, setOpenAdd] = useState(false);
	const [editData, setEditData] = useState<any>(null);

	const currentUser = useAppSelector((state: RootState) => state.user.currentUser);

	useEffect(() => {
		if (currentUser?.uid) {
			dispatch(fetchClientsByUser(currentUser.uid));
		}
	}, [dispatch, currentUser?.uid]);

	const filtered = clients.filter(
		(c: any) =>
			c.name.toLowerCase().includes(search.toLowerCase()) ||
			c.email.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className='p-4 md:p-8'>
			<Card className='shadow-lg'>
				<CardHeader className='flex flex-row justify-between items-center'>
					<CardTitle className='text-xl font-bold'>Clients</CardTitle>
					<Button
						onClick={() => setOpenAdd(true)}
						className='flex items-center gap-2'
					>
						<Plus className='w-4 h-4' /> Add Client
					</Button>
				</CardHeader>

				<CardContent>
					<div className='mb-4'>
						<Input
							placeholder='Search by name or email...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='max-w-sm'
						/>
					</div>

					{/* TABLE */}
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead>Address</TableHead>
									<TableHead className='text-right'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{clients.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className='text-center py-6'
										>
											Loading...
										</TableCell>
									</TableRow>
								) : filtered.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className='text-center py-6'
										>
											No Clients Found
										</TableCell>
									</TableRow>
								) : (
									filtered.map((client: any) => (
										<TableRow key={client.id}>
											<TableCell className='font-medium'>
												{client.name}
											</TableCell>
											<TableCell>
												{client.email}
											</TableCell>
											<TableCell>
												{client.phone}
											</TableCell>
											<TableCell>
												{client.address}
											</TableCell>

											<TableCell className='text-right flex justify-end gap-2'>
												<Button
													size='sm'
													variant='outline'
													onClick={() =>
														setEditData(client)
													}
												>
													<Pencil className='w-4 h-4' />
												</Button>

												<Button
													size='sm'
													variant='destructive'
													onClick={() =>
														dispatch(
															deleteClient(
																client.id,
															),
														)
													}
												>
													<Trash className='w-4 h-4' />
												</Button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* ADD CLIENT MODAL */}
			<AddClientModal
				open={openAdd}
				onClose={() => setOpenAdd(false)}
			/>

			{/* EDIT CLIENT MODAL */}
			{/* EDIT CLIENT MODAL */}
			<EditClientModal
				open={!!editData}
				client={editData}
				onClose={() => setEditData(null)}
				onUpdate={(updatedData) => {
					console.log('updated:', updatedData);
				}}
			/>
		</div>
	);
};

export default Clients;
