import { useEffect } from 'react'
const useTitle = (title) => {
  useEffect(() => { document.title = `${title} | MediQueue` }, [title])
}
export default useTitle
