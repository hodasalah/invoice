import { useTranslation } from 'react-i18next';

const Logo = () => {
	const { i18n, t } = useTranslation();
	const isArabic = i18n.language === 'ar';


	return (
		<div
			dir={isArabic ? 'rtl' : 'ltr'}
			className={`flex items-center gap-2 `}
		>
			{/* أيقونة اللوجو */}
			<svg
				className={`w-8 h-8 `}
				viewBox='0 0 32 32'
				xmlns='http://www.w3.org/2000/svg'
			>
				<defs>
					<linearGradient
						id='hlogo-a'
						x1='0%'
						y1='32.443%'
						x2='104.18%'
						y2='50%'
					>
						<stop
							offset='0%'
							stopColor='#FFF'
							stopOpacity='.299'
						/>
						<stop
							offset='100%'
							stopColor='#7587E4'
							stopOpacity='0'
						/>
					</linearGradient>
					<linearGradient
						id='hlogo-b'
						x1='18.591%'
						y1='0%'
						x2='100%'
						y2='100%'
					>
						<stop
							offset='0%'
							stopColor='#818CF8'
						/>
						<stop
							offset='100%'
							stopColor='#C7D2FE'
						/>
					</linearGradient>
				</defs>
				<g
					fill='none'
					fillRule='evenodd'
				>
					<path
						fill='#3730A3'
						d='M16 18.5V32l15.999-9.25V9.25z'
					/>
					<path
						fill='#4F46E5'
						d='m0 23 16 9V18.501L0 9.251z'
					/>
					<path
						fill='url(#hlogo-a)'
						fillOpacity='.64'
						d='M16 13 0 23l16 9 16-9z'
					/>
					<path
						fill='url(#hlogo-b)'
						d='M16 0 0 9.25l16 9.25 15.999-9.25z'
					/>
				</g>
			</svg>
			<span className={`text-[1.5rem] font-bold dark:text-gray-200 text-[rgb(25,29,37)] `}>
				{t('brand')}
			</span>
		</div>
	);
};

export default Logo;
