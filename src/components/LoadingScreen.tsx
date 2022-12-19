import cn from 'classnames';

interface LoadingScreenProps {
  hide: boolean;
}

export default function LoadingScreen({ hide }: LoadingScreenProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn('fixed top-0 left-0 z-10 h-screen w-full bg-slate-100/50', {
        hidden: hide,
      })}
    />
  );
}
