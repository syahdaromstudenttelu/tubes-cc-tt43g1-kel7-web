import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { interFont } from '../../lib/myNextFonts';

type SecondaryButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode;
};
export default function SecondaryButton(props: SecondaryButtonProps) {
  const {
    children,
    type: _type,
    className: _className,
    ...buttonProps
  } = props;

  return (
    <button
      type="button"
      className={`${interFont.variable} text-lg" font-poppins-sb inline-block w-full rounded-lg border-4 border-slate-800 py-3 text-center`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
