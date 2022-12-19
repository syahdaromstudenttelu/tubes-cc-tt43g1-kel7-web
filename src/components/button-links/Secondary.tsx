import type { ReactNode } from 'react';
import type { UrlObject } from 'url';
import { interFont } from '../../lib/myNextFonts';
import Link from 'next/link';

interface SecondaryButtonLinkProps {
  children: ReactNode;
  hrefPath: string | UrlObject;
}

export default function SecondaryButtonLink({
  children,
  hrefPath,
}: SecondaryButtonLinkProps) {
  return (
    <Link
      className={`${interFont.variable} inline-block w-full rounded-lg border-4 border-slate-800 py-3 text-center font-inter text-lg font-semibold`}
      href={hrefPath}
    >
      {children}
    </Link>
  );
}
