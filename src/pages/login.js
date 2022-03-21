import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useUser } from '../lib/hooks';

export default function LoginPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect email or password. Try better!');
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/');
  }, [user]);

  return (
    <>
      <section className='mx-auto max-w-sm text-center'>
        <div className='space-y-4'>
          <header className='mb-3 text-xl font-bold'>
            Log in
          </header>

          {errorMsg && <p className='error'>{errorMsg}</p>}

          <form onSubmit={onSubmit}>
            <div className='w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2'>
              <input
                type='text'
                name='email'
                required
                placeholder='Email Address'
                className='my-2 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <div className='w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2'>
              <input
                type='password'
                name='password'
                required
                placeholder='Type your Password'
                className='my-2 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <button className='bg-sky-500/100 w-full rounded-2xl py-3 font-bold bg-blue-600 mt-3'>
              Log In
            </button>

            <div className='mt-3'>
            <Link href="/signup">
              <a className='p-2'>I don&apos;t have an account</a>
            </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
