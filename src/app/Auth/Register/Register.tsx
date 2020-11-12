import { React, styled, FC, useState } from 'core'
import { useHistory } from 'router'
// import { useSelector } from 'redux-core'

import { Form, FormField, FormInput, FormFieldGroup, required } from 'form'
import { ButtonWrapper, PrimaryButton, RingLoader as Ring, toast } from 'ui'
import { registerService } from 'service'
// import { getCurrentUser } from 'Store'

export const Register: FC = () => {
  const history = useHistory()
  // const currentUser = useSelector(getCurrentUser)

  // useEffect(() => {
  //   if (currentUser) {
  //     history.push('/')
  //   }
  // }, [history, currentUser])

  const [state, setState] = useState({
    transmitting: false
  })

  const registerActionCreator = async ({ username, password, name }) => {
    try {
      const user = await registerService.add({
        username: username.trim().toLowerCase(),
        password,
        name
      })
      if (user) {
        return 200
      }
      return 401
    } catch (e) {
      return console.error(e.message)
    }
  }

  const onSubmit = async value => {
    await setState({ transmitting: true })
    const registerStatus = await registerActionCreator(value)
    await setState({ transmitting: false })
    if (registerStatus === 200) {
      toast('Register successfully')
      history.push('/')
    } else {
      toast.error('Something goes wrong!')
    }
  }

  return (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError, ...form }) => {
          return (
            <FormWrapper onSubmit={handleSubmit}>
              <Content>
                <FieldGroup>
                  <FormField>
                    <FormInput
                      validate={required()}
                      name='username'
                      placeholder='Username'
                      maxLength='40'
                    />
                  </FormField>
                </FieldGroup>
                <FieldGroup>
                  <FormField>
                    <FormInput name='name' placeholder='Name' />
                  </FormField>
                </FieldGroup>
                <FieldGroup>
                  <FormField>
                    <FormInput
                      validate={required()}
                      name='password'
                      placeholder='Password'
                      type='password'
                    />
                  </FormField>
                </FieldGroup>
              </Content>
              {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
              <ButtonWrapper>
                <PrimaryButton
                  type='submit'
                  disabled={state.transmitting | form.pristine}
                >
                  Register
                  {state.transmitting && <RingLoader small />}
                </PrimaryButton>
              </ButtonWrapper>
            </FormWrapper>
          )
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 50px;
  width: 70%;
  height: auto;
  background-color: white;
  margin: 0px auto;
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: calc(0.3rem - 1px);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.2);
`

const FormWrapper = styled.form`
  width: 100%;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
`

interface FieldGroupProps {
  [x: string]: any
}

const FieldGroup = styled(FormFieldGroup)<FieldGroupProps>`
  flex: 0 0 auto;
  ${props => props.shrink && 'flex: 0 1 auto;'};
`

const Content = styled.div``

const RingLoader = styled(Ring)`
  position: absolute;
  top: 10px;
`

const ErrorMessage = styled.span`
  font-size: 13px;
  line-height: 1;
  margin: 8px 0;
  color: red;
`

// const Icon = styled(DefaultIcon)`
//   margin-bottom: 12px;
// `
