import { React, styled } from 'core'

export const SpinnerLoader = () => {
  return (
    <LoaderContainer>
      <LoadingBox>
        <LoadingBox>
          <CircularLoader />
          <LoaderMessage>Loading...</LoaderMessage>
        </LoadingBox>
      </LoadingBox>
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
  height: 200px;
  width: 300px;
  margin: 0 auto;
  color: black;
  z-index: 10;
`

const LoadingBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-transition: width 0.5s, height 1s; /* For Safari 3.1 to 6.0 */
  transition: width 0.5s, height 1s;
`

const CircularLoader = styled.div`
  border: 4px solid #ccc;
  border-top: 4px solid #1f73ab;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  transition: all 0.5s ease-out;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoaderMessage = styled.div`
  padding: 1em 0;
`
