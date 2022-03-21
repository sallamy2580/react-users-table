import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="focus:outline-none bg-none rounded p-3 h-10 w-10 flex items-center justify-center"
      onClick={() => setTheme(theme === `light` ? `dark` : `light`)}
    >
      {theme === `light` ? <FaMoon /> : <FaSun />}
    </button>
  )
}
