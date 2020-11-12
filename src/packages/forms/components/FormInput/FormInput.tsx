import { React, styled, FC } from 'core'

import { useField } from '../../adapters/react-final-form'
import { Icon } from 'ui'

interface FormInputProps {
  [x: string]: any
}

export class Input extends React.Component<FormInputProps> {
  render() {
    const {
      errorMessage,
      hasError,
      success,
      placeholder,
      value,
      ...props
    } = this.props
    return (
      <InputWrapper>
        <PureInput
          {...props}
          hasError={hasError}
          success={success}
          value={value}
        />
        <Label
          filled={
            value !== null && value !== undefined && value && value !== ''
          }
        >
          {placeholder}
        </Label>
        {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {success && (
          <SuccessMessage>
            <Icon
              source={require('../../assets/allow.svg')}
              height='14px'
              width='14px'
              fill='#49BA9D'
            />
          </SuccessMessage>
        )}
      </InputWrapper>
    )
  }
}

const onChange = (
  onChange?: (value: any) => void,
  onChangeProp?: (value: any) => void,
  ...restProps: any
) => rawValue => {
  const { noWhiteSpace, lowercase } = restProps
  let value = lowercase ? rawValue.toLowerCase() : rawValue
  value = noWhiteSpace ? value.replace(/ /g, '') : value
  onChange && onChange(value)
  onChangeProp && onChangeProp(value)
}

export const FormInput: FC<FormInputProps> = ({
  onChange: onChangeProp,
  name,
  validate,
  placeholder,
  noWhiteSpace,
  lowercase,
  prefix,
  disabled,
  ...restProps
}) => {
  const { meta, input } = useField(name, {
    validate
  })
  const { error, touched, valid } = meta
  const { onChange: onInputChange, value, ...inputProps } = input
  const hasError = !valid && touched && error
  const success = valid && touched

  return (
    <PrefixWrapper>
      {prefix && <Prefix>{prefix}</Prefix>}
      <InputWrapper>
        <PureInput
          {...restProps}
          {...inputProps}
          disabled={disabled}
          hasError={hasError}
          success={success}
          onChange={event =>
            onChange(onInputChange, onChangeProp, { noWhiteSpace, lowercase })(
              event.target.value
            )
          }
          value={value}
        />
        <Label
          filled={
            value !== null && value !== undefined && value && value !== ''
          }
        >
          {placeholder}
        </Label>
        {hasError && <ErrorMessage>{error}</ErrorMessage>}
        {success && (
          <SuccessMessage>
            <Icon
              source={require('../../assets/allow.svg')}
              height='14px'
              width='14px'
              fill='#49BA9D'
            />
          </SuccessMessage>
        )}
      </InputWrapper>
    </PrefixWrapper>
  )
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const PrefixWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Prefix = styled.div`
  background: #f1f1f1;
  border: 1px solid #ddd;
  border-right: 0;
  font-size: 12px;
  padding: 8px;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  align-self: center;
`

interface PureInputProps {
  hasError?: boolean
  success?: boolean
  [x: string]: any
}

export const PureInput = styled.input<PureInputProps>`
  width: 100%;
  padding: 8px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 0;
  color: #000;
  font-weight: 400;
  font-size: 14px;
  border-radius: calc(0.3rem - 1px);

  ${props =>
    props.hasError &&
    `
    border: 2px solid red;
  `} ${props =>
    props.success &&
    `
    border: 2px solid #49BA9D;
  `}
  &:placeholder-shown {
    opacity: 1;
    font-weight: 100;
    color: hsl(0, 0%, 50%);
  }
  &:focus {
    outline: none;
    border: 2px solid #12b1cf;
  }
  &[disabled],
  &[readonly] {
    background: #eee;
    cursor: not-allowed;
  }
`

interface LabelProps {
  filled?: string
  [x: string]: any
}

const Label = styled.label<LabelProps>`
  color: #999;
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 14px;
  top: 10px;
  transition: 0.2s ease all;
  ${props =>
    props.filled &&
    `
    top: -17px;
    left: 0px;
    font-size: 12px;
    color: #000;
  `};
`

const ErrorMessage = styled.span`
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 10px;
  line-height: 1;
  color: red;
`

const SuccessMessage = styled.div`
  position: absolute;
  bottom: 12px;
  right: 10px;
`
