import Link from 'next/link'
import React from 'react'

const LinkTo = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...anchorProps
}) => (
  <Link {...{ href, as, replace, scroll, shallow, prefetch, locale }}>
    <a {...anchorProps}>{children}</a>
  </Link>
)

export default LinkTo
