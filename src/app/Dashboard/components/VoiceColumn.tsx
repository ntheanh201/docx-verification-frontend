import React from 'react'
import useVoiceName from '../hooks/useVoiceName'

const VoiceColumn = ({ voice_id }) => {
  const name = useVoiceName(voice_id)
  return <>{name}</>
}

export default VoiceColumn
