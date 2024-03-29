import * as React from 'react';

export function LayoutVertical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke='#475569'
      {...props}
    >
      <path
        d='M6.2 21c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 19.48 3 18.92 3 17.8v-.6c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 14 5.08 14 6.2 14h11.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 15.52 21 16.08 21 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C19.48 21 18.92 21 17.8 21H6.2zM6.2 10c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 8.48 3 7.92 3 6.8v-.6c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 3 5.08 3 6.2 3h11.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 4.52 21 5.08 21 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C19.48 10 18.92 10 17.8 10H6.2z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
