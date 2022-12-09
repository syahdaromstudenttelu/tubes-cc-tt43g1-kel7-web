import type { ReactNode } from 'react';
import cn from 'classnames';

interface ErrorMessageProps {
  showError: boolean;
  children: ReactNode;
}

export default function ErrorMessage({
  showError,
  children,
}: ErrorMessageProps) {
  return (
    <p
      className={cn(
        'invisible mx-auto w-max rounded-md bg-rose-100 px-3 py-1 text-rose-600',
        {
          '!visible': showError,
        }
      )}
    >
      {children}
    </p>
  );
}
