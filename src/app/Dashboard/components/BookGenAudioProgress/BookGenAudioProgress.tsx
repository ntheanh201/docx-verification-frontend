import { Progress } from 'antd'
import { React, useState, useEffect } from 'core'
import { useDispatch } from 'redux-core'
import { pageService } from 'service'

import { acceptAudioDownload } from 'Store'

export const BookGenAudioProgress = ({ id }) => {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (id) {
      pageService.getGenAudioProgress(id).then(res => {
        const pro = (res.generated * 100) / res.totals
        setProgress(pro.toFixed(2))
        if (res.generated === res.totals) {
          dispatch(acceptAudioDownload({ id }))
        }
      })
    }
  }, [id, setProgress, dispatch])
  // return <div>{progress}%</div>
  return (
    <Progress
      strokeColor={{
        '0%': '#52c41a',
        '100%': '#52c41a'
      }}
      percent={progress}
      size='small'
      status='active'
    />
  )
}
