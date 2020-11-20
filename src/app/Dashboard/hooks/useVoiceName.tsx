import React from 'react'
import { useSelector } from 'redux-core'
import { getVoices } from '../../Store/Audio'
import { useMemo } from 'core'

const useVoiceName = (id) => {
  const stateVoices = useSelector(getVoices)
  const voice = useMemo(
    () => stateVoices && stateVoices.find(v => v.id === id),
    [stateVoices]
  )
  return voice ? voice.name : 'Unknown'
}

export default useVoiceName
