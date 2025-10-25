import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRightIcon, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DropdownItem } from '../../shared/DropdownItem';

export const UserDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const currentUser = useAppSelector((state) => state.user.currentUser);

	const handleLogout = () => {
		dispatch(logoutUser()); // استخدم الإجراء لتسجيل الخروج
		navigate('/login');
	};

	return (
		<div className='w-full'>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-muted transition-colors'
			>
				<div className='flex items-center gap-3'>
					<img
						src={currentUser?.avatar || '/assets/user.jpg'}
						alt='User'
						className='w-10 h-10 rounded-md object-cover'
					/>
					<div className='flex flex-col text-left'>
						<span className='text-sm font-semibold text-text-dark'>
							{currentUser?.firstName +
								' ' +
								currentUser?.lastName || 'User Name'}
						</span>
						<span className='text-xs text-muted-foreground'>
							{currentUser?.role || 'User Role'}
						</span>
					</div>
				</div>

				{/* السهم المتحرك */}
				<motion.div
					initial={false}
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ChevronRightIcon className='w-4 h-4 text-muted-foreground' />
				</motion.div>
			</button>

			{/* القائمة المنسدلة */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.2 }}
						className='flex flex-col gap-1 mt-2 bg-white border rounded-md shadow-md py-2'
					>
						<DropdownItem
							icon={User}
							label='الملف الشخصي'
							onClick={() => navigate('/profile')}
						/>
						<DropdownItem
							icon={LogOut}
							label='تسجيل الخروج'
							onClick={() => handleLogout()}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
