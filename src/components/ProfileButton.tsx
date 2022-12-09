import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

interface ProfileButtonProps {
  onSignOut?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ProfileButton({
  onSignOut = () => {},
}: ProfileButtonProps) {
  const [closeProfileMenu, setCloseProfileMenu] = useState(true);
  const nextRouter = useRouter();

  const onProfileMenu = () => setCloseProfileMenu((prevValue) => !prevValue);

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-block rounded bg-gray-200 px-2 py-1 font-semibold"
        onClick={onProfileMenu}
      >
        Hi, {nextRouter.query.username}!
      </button>

      <button
        type="button"
        className={cn(
          'absolute top-[120%] left-0 inline-block w-full rounded bg-slate-600 px-2 py-1 font-semibold text-slate-100',
          {
            hidden: closeProfileMenu,
          }
        )}
        onClick={onSignOut}
      >
        Keluar
      </button>
    </div>
  );
}
