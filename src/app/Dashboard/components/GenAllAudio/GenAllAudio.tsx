import { React, useEffect, styled } from 'core'
import { useDispatch, useSelector } from 'redux-core'

import { Select } from 'antd'
import { getAudioState, getVoicesActionCreator } from 'Store'
import { LoadingIndicator } from 'ui'

const { Option } = Select

export const GenAllAudio = ({ onChangeVoice: onChangeVoiceProps, id, default_voice }) => {
  // const dispatch = useDispatch()
  const { voices } = useSelector(getAudioState)

  const onChangeVoice = id => {
    onChangeVoiceProps(id)
  }

  // useEffect(() => {
  //   const getVoicesInfo = async () => {
  //     await dispatch(getVoicesActionCreator())
  //   }
  //   getVoicesInfo()
  // }, [dispatch])

  if (!voices) {
    return <LoadingIndicator />
  }

  return (
    <Wrapper>
      <Span>Chọn giọng đọc</Span>
      <Select defaultValue={voices[0].id} onChange={onChangeVoice}>
        {voices?.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Span = styled.span`
  margin-right: 8px;
`
