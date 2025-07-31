// src/components/landing/Footer.tsx
const Footer = () => {
	return (
		<footer className=' py-10 px-6 text-center mt-16'>
			<div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400'>
				{/* اسم المشروع */}
				<div className='flex items-center gap-2'>
					<svg
						className='w-8 h-8'
						viewBox='0 0 32 32'
						xmlns='http://www.w3.org/2000/svg'
					>
						<defs>
							<linearGradient
								x1='0%'
								y1='32.443%'
								x2='104.18%'
								y2='50%'
								id='hlogo-a'
							>
								<stop
									stop-color='#FFF'
									stop-opacity='.299'
									offset='0%'
								></stop>
								<stop
									stop-color='#7587E4'
									stop-opacity='0'
									offset='100%'
								></stop>
							</linearGradient>
							<linearGradient
								x1='18.591%'
								y1='0%'
								x2='100%'
								y2='100%'
								id='hlogo-b'
							>
								<stop
									stop-color='#818CF8'
									offset='0%'
								></stop>
								<stop
									stop-color='#C7D2FE'
									offset='100%'
								></stop>
							</linearGradient>
						</defs>
						<g
							fill='none'
							fill-rule='evenodd'
						>
							<path
								fill='#3730A3'
								d='M16 18.5V32l15.999-9.25V9.25z'
							></path>
							<path
								fill='#4F46E5'
								d='m0 23 16 9V18.501L0 9.251z'
							></path>
							<path
								fill-opacity='.64'
								fill='url(#hlogo-a)'
								d='M16 13 0 23l16 9 16-9z'
							></path>
							<path
								fill='url(#hlogo-b)'
								d='M16 0 0 9.25l16 9.25 15.999-9.25z'
							></path>
						</g>
					</svg>
					<span className='font-bold text-gray-200 text-[1.5rem]'>
						فــاتــورتــي
					</span>
				</div>

				{/* روابط التنقل */}
				<div className='flex gap-6 text-sm'>
					<a
						href='#features'
						className='hover:text-white transition'
					>
						الميزات
					</a>
					<a
						href='#pricing'
						className='hover:text-white transition'
					>
						الأسعار
					</a>
					<a
						href='#contact'
						className='hover:text-white transition'
					>
						تواصل معنا
					</a>
				</div>

				{/* حقوق النشر */}
				<div className='text-xs text-gray-400'>
					© {new Date().getFullYear()} جميع الحقوق محفوظة.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
