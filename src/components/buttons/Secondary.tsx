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
    ...otherButtonProps
  } = props;

  return (
    <button
      type="button"
      className={`${interFont.variable} inline-block w-full rounded-lg border-4 border-slate-800 py-3 text-center font-inter text-lg font-semibold disabled:border-slate-400 disabled:text-slate-400`}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
}
