export default function CommentDisplay ({ commentID, comment, commentor }) {
  return (
    <div>
      <div className="flex flex-row items-center space-x-3">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="font-bold text-sm">{commentID}</div>
          <div className="font-bold text-sm">{commentor}</div>
          <div className="font-semibold text-gray-500 text-xs">{comment}</div>
        </div>
      </div>
      <div className="flex flex-row mt-3 border-t border-gray-200 dark:border-gray-800"></div>
    </div>
  )
}