import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {locales, defaultLocale, localePrefix, pathnames} from './config';

export {locales, defaultLocale, localePrefix, pathnames};

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
