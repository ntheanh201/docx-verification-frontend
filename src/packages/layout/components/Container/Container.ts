import { styled } from 'core'

export const size = {
  mobile: '576px',
  tablet: '768px',
  laptop: '992px',
  laptopL: '1200px'
}

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`
}

export const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media ${device.mobile} {
    max-width: 540px;
  }
  @media ${device.tablet} {
    max-width: 750px;
  }
  @media ${device.laptop} {
    max-width: 970px;
  }
  @media ${device.laptopL} {
    max-width: 1170px;
  }
`

const ColSize = props => {
  return props.size === 1
    ? '8.333333%'
    : props.size === 2
    ? '16.666667%'
    : props.size === 3
    ? '25%'
    : props.size === 4
    ? '33.333333%'
    : props.size === 5
    ? '41.666667%'
    : props.size === 6
    ? '50%'
    : props.size === 7
    ? '58.333333%'
    : props.size === 8
    ? '66.666667%'
    : props.size === 9
    ? '75%'
    : props.size === 10
    ? '83.333333%'
    : props.size === 11
    ? '91.666667%'
    : '100%'
}

export const Col = styled.div`
  position: relative;
  width: 100%;
  // padding-right: 15px;
  // padding-left: 15px;
  flex: 0 0 ${props => ColSize(props)};
  max-width: 0 0 ${props => ColSize(props)};
`
