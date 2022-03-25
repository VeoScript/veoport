import dynamic from 'next/dynamic'

export default dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => (
    <div className="inline-flex items-center justify-center w-full h-[20rem]">
      <h1 className="font-bold text-2xl">Loading...</h1>
    </div>
  )
})