import React from 'react'
import slugify from 'slugify'

import { MDXProvider } from '@mdx-js/react'
import { Language } from 'prism-react-renderer'
import { Box, Text, List, ListItem, Link } from 'piny-forest/src'
import { CodePlayground } from './code-playground'
import { CodeHighlight } from './code-highlight'

interface Props {
  className: string
  children?: React.ReactNode
  live?: boolean
}

function Code({ live, children, className, ...rest }: Props) {
  const code = React.Children.toArray(children).join('\n').trim()
  const language = className.replace('language-', '') as Language

  return live ? (
    <CodePlayground code={code} {...rest} />
  ) : (
    <CodeHighlight code={code} language={language} />
  )
}

function InlineCode(props: Props) {
  return (
    <Text
      as="code"
      variant="code"
      pss={{
        paddingX: 2,
        borderRadius: 2,
        backgroundColor: 'grey.100',
      }}
      {...props}
    />
  )
}

function getId(props: Props) {
  return typeof props.children === 'string'
    ? slugify(props.children, { lower: true, strict: true })
    : undefined
}

const H1 = (props: Props) => (
  <Text
    as="h3"
    id={getId(props)}
    variant="h3"
    pss={{
      width: '50%',
      marginBottom: 5,
      ':not(:first-of-type)': { marginTop: 6 },
    }}
    {...props}
  />
)

const H2 = (props: Props) => (
  <Text
    as="h4"
    id={getId(props)}
    variant="h4"
    pss={{
      width: '50%',
      marginBottom: 4,
      ':not(:first-of-type)': { marginTop: 5 },
    }}
    {...props}
  />
)

const H3 = (props: Props) => (
  <Text
    as="h5"
    id={getId(props)}
    variant="h5"
    pss={{
      width: '50%',
      marginBottom: 3,
      ':not(:first-of-type)': { marginTop: 4 },
    }}
    {...props}
  />
)

const Table = (props: Props) => (
  <Box
    as="table"
    pss={{
      width: '50%',
      borderCollapse: 'collapse',
    }}
    {...props}
  />
)

const TH = (props: Props) => (
  <Text
    as="th"
    variant="secondary"
    fontWeight="semi"
    textAlign="left"
    pss={{
      paddingY: 1,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'grey.200',
      ':first-of-type': { width: '16ch' },
    }}
    {...props}
  />
)

const TD = (props: Props) => (
  <Text
    as="td"
    variant="secondary"
    textAlign="left"
    pss={{
      paddingY: 1,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'grey.200',
    }}
    {...props}
  />
)

const P = (props: Props) => (
  <Text as="p" variant="primary" w={0.5} mb={3} {...props} />
)

const UL = (props: Props) => <List as="ul" w={0.5} mb={4} {...props} />
const LI = (props: Props) => <ListItem as="li" mb={1} {...props} />

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  li: LI,
  table: Table,
  th: TH,
  td: TD,
  a: (props: Props) => <Link variant="article" {...props} />,
  pre: (props: Props) => props.children as JSX.Element,
  code: Code,
  inlineCode: InlineCode,
}

export function MDX(props: { children: React.ReactNode }) {
  return <MDXProvider components={components} {...props} />
}
