import { styled } from 'core'

interface FormFieldProps {
  flex?: string
  width?: string
}

export const FormField = styled.div<FormFieldProps>`
  display: flex;
  flex: ${props => props.flex || '0 1 auto'};
  width: ${props => props.width || '100%'};
  flex-direction: column;
  margin: 8px 0;
`
