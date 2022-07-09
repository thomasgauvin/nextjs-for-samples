import { useState, useEffect } from 'react'

export async function fetchSwaUser(cookie = '') {
  if (typeof window !== 'undefined' && window.__swauser) {
    return window.__swauser
  }

  const res = await fetch(
    '/api/meswa',
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  )

  if (!res.ok) {
    delete window.__swauser
    return null
  }

  const json = await res.json()
  if (typeof window !== 'undefined') {
    window.__swauser = json
  }
  return json
}

export function useFetchSwaUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__swauser)
  )
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return window.__swauser || null
  })

  useEffect(
    () => {
      if (!loading && user) {
        return
      }
      setLoading(true)
      let isMounted = true

      fetchSwaUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = '/.auth/login/aad'
            return
          }
          setUser(user)
          setLoading(false)
        }
      })

      return () => {
        isMounted = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user, loading }
}
