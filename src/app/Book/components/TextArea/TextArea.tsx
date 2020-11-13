import { React } from 'core'

import { Input } from 'antd'

const { TextArea: TextInput } = Input

export const TextArea = ({ content }) => {
  return (
    <>
      <TextInput rows={10} value={content} />
    </>
  )
}
