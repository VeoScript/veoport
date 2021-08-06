// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "veoport",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  })
}