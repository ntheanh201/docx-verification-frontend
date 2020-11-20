import React from 'react'
import { Select } from 'antd'
import { useEffect } from 'core'
import { useSelector } from 'react-redux'
import { getVoices } from '../../Store/Audio'

interface InputProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

const VoiceSelect: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled
}) => {
  const voices = useSelector(getVoices)
  console.log(value)
  // const [voices, setVoices] = useState([])
  // useEffect(() => {
  //   audioService.getAudioVoice().then(res => {
  //     if (res && Array.isArray(res.voices)) {
  //       setVoices(res.voices)
  //     }
  //   })
  // }, [])
  useEffect(() => {
    if (Array.isArray(voices) && voices.length !== 0 && !value && onChange) {
      onChange(voices[0].id)
    }
  }, [voices, value, onChange])
  return (
    <div className={className}>
      <Select
        disabled={disabled}
        placeholder='Vui lòng chọn giọng'
        value={value}
        onChange={onChange}
      >
        {voices &&
          voices.map((v, i) => (
            <Select.Option value={v.id} key={i}>
              {v.name}
            </Select.Option>
          ))}
      </Select>
    </div>
  )
}

export default VoiceSelect
