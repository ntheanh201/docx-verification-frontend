import { React } from 'core'

import { Form as RFForm } from '../../adapters/react-final-form'
import { arrayMutators } from '../../adapters/final-form-arrays'

export const Form = (props: any) => (
  <RFForm
    mutators={{
      ...arrayMutators
    }}
    {...props}
  >
    {props.children}
  </RFForm>
)
