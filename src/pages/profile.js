import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';

function ProfileEdit() {
  const [user, { mutate }] = useUser();
  const router = useRouter()

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
          <label>
            <span>First Name</span>
            <input type='text' name='first_name' required defaultValue={user.first_name || ''}/>
          </label>
          <label>
            <span>Last Name</span>
            <input type='text' name='last_name' required  defaultValue={user.last_name || ''}/>
          </label>
          <div className='submit'>
            <button type='submit'>Update profile</button>
            <a role='button' className='delete' onClick={handleDeleteProfile}>
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
  const router = useRouter()

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user) router.replace('/');
  }, [user, loading, router]);

  return (
    <>
      <h1>Profile</h1>

      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <ProfileEdit />
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
