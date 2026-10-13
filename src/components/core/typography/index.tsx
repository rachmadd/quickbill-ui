'use client'
import { H1 } from './h1'
import { H2 } from './h2'
import { H3 } from './h3'
import { Title } from './title'
import { Content, type ContentProps } from './content'
import { Link } from './link'

const Typography = ({ children, ...props }: ContentProps) => {
  return <Content {...props}>{children}</Content>
}

export {
  Typography,
  H1 as TypographyH1,
  H2 as TypographyH2,
  H3 as TypographyH3,
  Title as TypographyTitle,
  Content as TypographyContent,
  Link as TypographyLink,
}
