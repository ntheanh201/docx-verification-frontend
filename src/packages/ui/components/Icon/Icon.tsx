import { React, styled } from 'core'

interface IconProps {
  source: any
  height?: string
  fill?: string
  width?: string
  className?: string
  isImage?: string
  onClick?: (value?: any) => void
}

export class Icon extends React.PureComponent<IconProps> {
  static defaultProps = {
    height: '20px',
    width: '20px'
  }
  render() {
    const {
      source,
      height,
      fill,
      width,
      className,
      isImage = false,
      onClick,
      ...props
    } = this.props

    if (/.(jpe?g|png|gif|bmp)$/i.test(source) || isImage) {
      return (
        <IconImage
          className={className}
          src={source}
          height={height}
          width={width}
          onClick={onClick}
          {...props}
        />
      )
    } else {
      return (
        <IconSource
          className={className}
          fill={fill}
          height={height}
          width={width}
          dangerouslySetInnerHTML={{ __html: source }}
          onClick={onClick}
          {...props}
        />
      )
    }
  }
}

const IconImage = styled.img``

interface IconSourceProps {
  height: string
  width: string
  fill: string
}

const IconSource = styled.div<IconSourceProps>`
  line-height: 0;
  svg {
    height: ${props => props.height};
    width: ${props => props.width};
  }
  ${props =>
    !!props.fill &&
    `
    path {
      fill: ${props.fill};
    }
  `};
  ${props => props.onClick && `cursor: pointer;`}
`
