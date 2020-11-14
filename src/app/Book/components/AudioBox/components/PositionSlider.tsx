import { React, styled } from 'core'

import { useSelector } from 'redux-core'
import { getSliderState } from 'Store'
import { Slider as SliderAntd } from 'antd'

export const PositionSlider = ({ setResumePos }) => {
  const { position, duration } = useSelector(getSliderState)

  return (
    <Slider value={position} min={0} max={duration} onChange={setResumePos} />
  )
}

const Slider = styled(SliderAntd)`
  width: 60px;
`
