import { useEffect } from 'react'

const useDocumentTitle = (newTitle) => {
  useEffect(() => {
    document.title = newTitle;
  }, [newTitle])
}

export default useDocumentTitle;