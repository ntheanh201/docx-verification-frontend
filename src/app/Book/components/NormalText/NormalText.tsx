import { React, styled, useEffect, useState } from 'core'

import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
// import FileViewer from 'react-file-viewer'
import { Document, Page, pdfjs } from 'react-pdf'

// import { TextBox } from '../TextArea/TextArea'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const NormalText = ({ content }) => {
  const [zoom, setZoom] = useState(654)

  const onChangeZoom = zoom => {
    setZoom(zoom)
  }

  return (
    <Wrapper>
      <Title>Văn bản gốc</Title>
      <ButtonWrapper>
        <ZoomOutButton onClick={() => onChangeZoom(zoom - 20)}>
          <ZoomOutOutlined />
        </ZoomOutButton>
        <Button onClick={() => onChangeZoom(zoom + 20)}>
          <ZoomInOutlined />
        </Button>
      </ButtonWrapper>
      {/* <TextBox value={content} /> */}
      <BookView content={content} zoom={zoom} />
    </Wrapper>
  )
}

const BookView = ({ zoom, content }) => {
  useEffect(() => {
    let canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.style.width = `${zoom}px`
      // canvas.width = zoom
    }
  }, [zoom])

  const onDocumentLoadSuccess = () => {
    console.log('abc')
  }

  return (
    <Document file={content} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={1} />
    </Document>
  )

  // return <FileViewer fileType='pdf' filePath={pdf} onError={onError} />
}

const Wrapper = styled.div`
  width: 50%;
  margin-right: 10px;
`

const Title = styled.h2`
  text-align: center;
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const ZoomOutButton = styled(Button)`
  margin-right: 10px;
`
