import {createNavigation} from 'next-intl/navigation';
import {locales, defaultLocale, localePrefix, pathnames} from './config';

export {locales, defaultLocale, localePrefix, pathnames};

export const {Link, redirect, usePathname, useRouter} = createNavigation({
  locales,
  localePrefix,
  pathnames
});
