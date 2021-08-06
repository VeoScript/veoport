import { withIronSession } from 'next-iron-session'

function handler(req, res, session) {
  req.session.destroy()
  res.send("Signed out")
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "veoport",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
})