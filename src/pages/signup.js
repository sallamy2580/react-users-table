import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useUser } from '../lib/hooks';

export default function SignupPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const [emailExist, setEmailExist] = useState(false)

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      first_name: e.currentTarget.first_name.value,
      last_name: e.currentTarget.last_name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/');
  }, [user]);

  return (
    <>
      <h1>Sign up to Example</h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <div className='form-container'>
        <form onSubmit={onSubmit}>
          <label>
            <span>First Name</span>
            <input type='text' name='first_name' required />
          </label>
          <label>
            <span>Last Name</span>
            <input type='text' name='last_name' required />
          </label>
          <label>
            <span>Email</span>
            <input type='text' name='email' required />
          </label>
          <label>
            <span>Password</span>
            <input type='password' name='password' required />
          </label>
          <label>
            <span>Repeat password</span>
            <input type='password' name='rpassword' required />
          </label>
          <div className='submit'>
            <button type='submit'>Sign up</button>
            <Link href='/login'>
              <a>I already have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
