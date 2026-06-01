import React from 'react';

interface CompanyLogoProps {
  name: string;
}

/** Generate initials logo from company name */
const CompanyLogo: React.FC<CompanyLogoProps> = ({ name }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div
      className='w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-xl shadow-md select-none'
      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))' }}
    >
      {initials || '?'}
    </div>
  );
};

export default CompanyLogo;
