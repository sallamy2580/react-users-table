import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';

function ProfileEdit() {
  const [user, { mutate }] = useUser();
  const router = useRouter();

  async function handleEditProfile(e) {
    e.preventDefault();

    const body = {
      first_name: e.currentTarget.first_name.value,
      last_name: e.currentTarget.last_name.value,
    };
    const res = await fetch(`/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const updatedUser = await res.json();

    mutate(updatedUser);
  }

  async function handleDeleteProfile() {
    const res = await fetch(`/api/user`, {
      method: 'DELETE',
    });

    if (res.status === 204) {
      mutate({ user: null });
      router.replace('/');
    }
  }

  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleEditProfile}>
          <label className='block mb-3'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              First Name
            </span>
            <input
              type='text'
              name='first_name'
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              placeholder='First Name'
              defaultValue={user.first_name}
            />
          </label>
          <label className='block'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Last Name
            </span>
            <input
              type='text'
              name='last_name'
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              placeholder='First Name'
              defaultValue={user.last_name}
            />
          </label>
          <div className='submit mt-3'>
            <button
              type='submit'
              className='inline-block px-6 py-2.5 bg-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
            >
              Update profile
            </button>
            <a
              role='button'
              className='delete inline-block px-6 py-2.5 bg-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
              onClick={handleDeleteProfile}
            >
              Delete profile
            </a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .delete {
          color: #f44336;
          cursor: pointer;
        }
        .delete:hover {
          color: #b71c1c;
        }
      `}</style>
    </>
  );
}

export default function ProfilePage() {
  const [user, { loading }] = useUser();
  const router = useRouter();

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user) router.replace('/');
  }, [user, loading, router]);

  return (
    <div className='m-auto w-80'>
      <h1 className='mb-3 font-bold'>Profile</h1>

      {user && (
        <>
          <ProfileEdit />
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
