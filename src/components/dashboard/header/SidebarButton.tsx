import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';


interface CollapseButtonProps {
	collapsed: boolean;
	toggleCollapse: () => void;
}

export const SidebarButton = ({
	collapsed,
	toggleCollapse,
}: CollapseButtonProps) => {
	return (
		<div
			className='relative hidden md:block'
		>
			<AnimatePresence>
				<motion.button
					initial={{ opacity: 0, scale: 0.8, y: -10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: -10 }}
					transition={{ duration: 0.3 }}
					onClick={toggleCollapse}
					className='w-10 h-10 rounded-full bg-gradient5 text-white shadow-md flex items-center justify-center ripple'
				>
					{collapsed ? (
						<ChevronsRight size={20} />
					) : (
						<ChevronsLeft size={20} />
					)}
				</motion.button>
			</AnimatePresence>
		</div>
	);
};
