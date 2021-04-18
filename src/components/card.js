import Link from 'next/link'
import Image from 'next/link'
import Moment from 'react-moment'
import Images from './images'
import Profiles from './profiles'
import { getStrapiMedia } from '~/lib/strapi/media'

export default function Card({ article }) {
  return (
    <div className="flex flex-col justify-center w-full bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-row items-center space-x-3 px-3 py-3">
        <Profiles author={article.author.picture} />
        <div className="flex flex-col">
          <div className="text-base">
            {article.author.name}
          </div>
          <div className="font-light text-xs text-gray-500">
            <Moment format="MMMM DD, YYYY - hh:mm A">
              {article.published_at}
            </Moment>
          </div>
        </div>
      </div>
      <div className="flex">
        <Images image={article.image} />
      </div>
      <div className="flex flex-row items-center justify-between p-3">
        <div className="flex flex-col">
          <p className="font-bold text-xl capitalize">{article.title}</p>
          <p className="font-semibold text-sm uppercase">{article.category.name}</p>
        </div>
        <Link as={`/post/${article.slug}`} href="/post/[id]">
          <a className="flex flex-row max-w-xl text-white text-xs items-center rounded-md bg-[#62A9FF] px-3 py-2 transition ease-in-out duration-200 transform hover:-translate-y-0.5">
            Read More...
          </a>
        </Link>
      </div>
    </div>
  )
}
