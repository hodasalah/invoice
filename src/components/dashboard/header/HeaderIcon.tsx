import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';


interface HeaderIconProps {
  icon: ReactNode;
  gradientClass: string;
  tooltip?: string;
  count?: number;
}
export  const HeaderIcon: FC<HeaderIconProps> = ({
	icon,
	gradientClass,
	tooltip,
	count,
}) => {
	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className={cn(
						'relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer',
						gradientClass,
					)}
				>
					{/* تأكد إن الأيقونة دايمًا بتظهر */}
					<div className='z-10'>{icon}</div>

					{/* الرقم يظهر فقط لو موجود */}
					{typeof count === 'number' && count > 0 && (
						<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow z-20'>
							{count}
						</span>
					)}
				</motion.div>
			</Tooltip.Trigger>

			{tooltip && (
				<Tooltip.Portal>
					<Tooltip.Content
						side='bottom'
						sideOffset={6}
						className='bg-black text-white px-2 py-1 rounded text-sm shadow-lg'
					>
						{tooltip}
						<Tooltip.Arrow className='fill-black' />
					</Tooltip.Content>
				</Tooltip.Portal>
			)}
		</Tooltip.Root>
	);
};
