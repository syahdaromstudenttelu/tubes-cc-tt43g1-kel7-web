import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { interFont } from '../../lib/myNextFonts';

type PrimaryButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode;
};

export default function PrimaryButton(props: PrimaryButtonProps) {
  const {
    children,
    type: _type,
    className: _className,
    ...buttonProps
  } = props;

  return (
    <button
      type="button"
      className={`${interFont.variable} text-slate-100" inline-block w-full rounded-lg bg-slate-800 py-3 text-center font-inter font-semibold text-slate-100`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
