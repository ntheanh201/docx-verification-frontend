import { React, FC } from 'core'

import { Layout } from 'antd'

const { Footer: FooterAntd } = Layout

export const Footer: FC = () => {
  return <FooterAntd style={{ textAlign: 'center' }}>©2020 AISol</FooterAntd>
}
