import Card from './card'

export default function Posts({ articles }) {
  return (
    <div className="flex flex-col space-y-3">
      {articles.map((article) => {
        return <Card article={article} key={`article__${article.slug}`} />
      })}
    </div>
  )
}
