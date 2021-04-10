import Head from 'next/head'
import Layout from '../layouts/default'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jerome Villaruel</title>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <h1>PUTANG INA MO</h1>
        </div>
      </Layout>
    </>
  )
}
