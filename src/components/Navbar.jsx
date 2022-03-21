import Link from 'next/link';
import { FaCaretDown, FaCloud } from 'react-icons/fa';

import { useUser } from '../lib/hooks';
import ThemeButton from './themebutton';

export default function Navbar() {
  const [user, { mutate }] = useUser();

  async function handleLogout() {
    await fetch('/api/logout');
    mutate({ user: null });
  }

  return (
    <header>
      <nav className='w-full flex justify-start items-center mx-auto max-w-4xl px-8 my-20'>
        <Link href='/'>
          <a className='focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200 flex flex-row'>
            <FaCloud className='mr-5 mt-1' />
            <span className='hidden md:block'>Home</span>
          </a>
        </Link>
        {user ? (
          <>
            <Link href='/profile'>
              <a className='focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200'>
                Profile
              </a>
            </Link>
            <a
              role='button'
              onClick={handleLogout}
              className='focus:outline-none ml-auto mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200'
            >
              Logout
            </a>
          </>
        ) : (
          <div className='ml-auto'>
            <Link href='/signup'>
              <a className='focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200'>
                Sign up
              </a>
            </Link>
            <Link href='/login'>
              <a className='focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200'>
                Login
              </a>
            </Link>
          </div>
        )}
        <div className='w-auto'>
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}
