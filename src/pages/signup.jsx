import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import { useUser } from '../lib/hooks'

export default () => {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    const body = {
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 201) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg(await res.text())
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <section className="mx-auto max-w-sm text-center">
      <div className="space-y-4">
        <header className="mb-3 text-xl font-bold">Create your profile</header>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <form onSubmit={onSubmit}>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2">
            <input
              type="text"
              name="firstName"
              required
              placeholder="First name"
              className="my-2 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2">
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last name"
              className="my-2 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2">
            <input
              type="text"
              name="email"
              required
              placeholder="Email Address"
              className="my-2 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 mb-2">
            <input
              type="password"
              name="password"
              required
              placeholder="Type your Password"
              className="my-2 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
            <input
              type="passoword"
              name="rpassword"
              required
              placeholder="Retype your Password"
              className="my-2 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500/100 w-full rounded-2xl py-3 font-bold bg-blue-600 mt-3"
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </section>
  )
}
