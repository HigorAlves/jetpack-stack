import React from 'react'

import { StateInspector } from 'reinspect'

type Children = { children: React.ReactNode }

const isProd = process.env.NODE_ENV !== 'production'
const EmptyComponent = ({ children }: Children) => <>{children}</>

const StateInspectorComponent = ({ children }: Children): JSX.Element => {
  const Wrapper = isProd ? StateInspector : EmptyComponent
  return <Wrapper name='App'>{children}</Wrapper>
}

export default StateInspectorComponent
