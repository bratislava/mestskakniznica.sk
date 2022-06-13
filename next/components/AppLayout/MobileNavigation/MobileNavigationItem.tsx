import React, { useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Menu,
  MenuFragment,
  MenusQuery,
} from '@bratislava/strapi-sdk-city-library';
import MobileSubnavigation from './MobileSubnavigation';

interface navItemProps {
  menu: Menu | MenuFragment | undefined | null;
  menus: NonNullable<MenusQuery['menus']>;
}

const MobileNavigationItem = ({ menu, menus }: navItemProps) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const menuSections: any = menu?.menuSections;
  return (
    <div className={cx('w-full text-default font-normal cursor-pointer px-4')}>
      <button
        onClick={() => setOpen(true)}
        className={cx(
          'w-full font-normal flex justify-between items-center text-default border-b border-gray-900',
          {
            'text-primary': router.asPath.includes(menu?.menuSlug ?? ''),
          }
        )}
      >
        <div className="text-[20px] text-gray-900">
          <div>{menu?.menuTitle}</div>
        </div>
        <div className="text-gray-900 text-right p-5">{'>'}</div>
      </button>
      <div>
        {isOpen && (
          <MobileSubnavigation
            menuSections={menuSections}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MobileNavigationItem;
