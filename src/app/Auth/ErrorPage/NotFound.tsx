import { React } from 'core'

import { Button, Result } from 'antd'
import { useHistory } from 'router'

export const NotFoundPage = () => {
  const history = useHistory()
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  )
}
