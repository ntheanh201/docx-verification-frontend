import { React, useState, useEffect } from 'core'
import { pageService } from 'service'
export const BookGenAudioProgress = ({ id }) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (id) {
      pageService.getGenAudioProgress(id).then(res => {
        const pro = (res.generated * 100) / res.totals
        setProgress(pro.toFixed(2))
      })
    }
  }, [id, setProgress])
  return <div>{progress}%</div>
}
