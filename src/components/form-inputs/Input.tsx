import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: InputProps) {
  const { className: _className, ...inputProps } = props;

  return (
    <input
      className="inline-block w-full rounded-lg bg-slate-300 py-3 px-4 text-lg"
      {...inputProps}
    />
  );
}
