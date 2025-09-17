type PrimaryBtnProps = {
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	onClick?: () => void;
	disabled: boolean;
	type?: 'button' | 'submit' | 'reset';
};
export const PrimaryBtn = ({
	children,
	className,
	icon,
	onClick,
	disabled = false,
	type = 'button',
}: PrimaryBtnProps) => {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`relative overflow-hidden ${
				icon && 'gap-2 flex items-center'
			} text-white hover:text-gray-300 transition bg-primary px-4 py-2 rounded-md ${
				className || ''
			} ripple`}
		>
			{children}
			{icon}
		</button>
	);
};

export const PrimaryOutlineBtn = () => {
	return <div>index</div>;
};
export const SecondaryBtn = ({
	children,
	className,
	onClick,
	type = 'button',
	disabled = false,
	icon,
}: PrimaryBtnProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={` ${
				icon && 'gap-2 flex  items-center'
			} text-white hover:bg-slate-600 transition text-[rgb(203,215,225))] bg-[rgb(51,65,85)] px-4 py-2 rounded-md border-[.5px] border-slate-300 ${
				className || ''
			} ripple`}
		>
			{children}
			{icon}
		</button>
	);
};
