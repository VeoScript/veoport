import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import { projects } from '~/static/portfolio'

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Layout>
        <div className="flex justify-center items-start md:items-center py-5 md:-mt-16 w-full h-screen overflow-y-auto md:overflow-hidden space-x-0 space-y-5 md:space-x-5 md:space-y-0">
          <div className="flex flex-col max-w-3xl items-center mx-5 space-y-5">
            <div className="flex flex-col text-center space-y-2">
              <h1 className="font-bold text-xl text-left">Projects</h1>
              <p className="text-justify text-sm">
                From Desktop and Mobile development to Web Components and UX design, check out my latest projects.
                If you want to collaborate just <Link href="contact"><a className="text-[#62A9FF]">get in touch</a></Link>.
              </p>
            </div>
            <div className="w-full h-full md:max-h-[450px] overflow-y-auto md:pr-2 pb-10 md:pb-0 space-y-2">
              {projects.map(({ name, image, description, link, demo }, i) => (
                <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between space-y-5 md:space-y-0 p-0 md:px-5 md:py-3 rounded-none md:rounded-xl border border-gray-300 dark:border-gray-700" key={i}>
                  <div className="flex flex-col w-full md:max-w-lg">
                    <div className="flex flex-col md:flex-row items-start space-x-3 space-y-3 md:space-y-0">
                      <img className="w-full h-full md:w-32 md:h-20 rounded-none md:rounded-sm object-cover" src={image} />
                      <div className="flex flex-col pr-3 space-y-1">
                        <div className="flex flex-row space-x-1">
                          <span className="font-semibold">{ name }</span>
                          <Link href={ demo }>
                            <a target="_blank">
                              <svg className={`w-5 h-5 ${demo == '/' ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                            </a>
                          </Link>
                        </div>
                        <p className="text-xs">{ description }</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start px-3 pb-3 md:p-0">
                    <Link href={ link }>
                      <a className="flex flex-row max-w-xl items-center rounded-md bg-[#62A9FF] px-2 py-1" target="_blank">
                        <svg className="w-4 h-4 fill-current text-[#181616] dark:text-white mr-2" viewBox="0 0 128 128"><g><path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path></g></svg>
                        <span className="text-sm">Code</span>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}