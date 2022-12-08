import type { ReactNode } from 'react';
import type { UrlObject } from 'url';
import Link from 'next/link';
import { interFont } from '../../lib/myNextFonts';

interface PrimaryButtonLinkProps {
  children: ReactNode;
  hrefPath: string | UrlObject;
}

export default function PrimaryButtonLink({
  children,
  hrefPath,
}: PrimaryButtonLinkProps) {
  return (
    <Link
      className={`${interFont.variable} inline-block w-full rounded-lg bg-slate-800 py-3 text-center font-inter text-lg font-semibold text-slate-100`}
      href={hrefPath}
    >
      {children}
    </Link>
  );
}
