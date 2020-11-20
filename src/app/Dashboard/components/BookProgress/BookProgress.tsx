import { Progress } from 'antd'
import { React, useState, useEffect } from 'core'
import { pageService } from 'service'

export const BookProgress = ({ id }) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (id) {
      pageService.getProgress(id).then(res => {
        const pro = (res.verified * 100) / res.totals
        setProgress(pro.toFixed(2))
      })
    }
  }, [id])
  // return <div>{progress}%</div>
  return <Progress percent={progress} size='small' status='active' />
}
