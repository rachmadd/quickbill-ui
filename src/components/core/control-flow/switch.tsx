import React, { type ReactNode } from 'react'

type CaseProps<T> = {
  value: T
  children: ReactNode
}

type DefaultCaseProps = {
  children: ReactNode
}

type SwitchCaseProps<T> = {
  value: T
  children: ReactNode
}

const Case = <T,>(_props: CaseProps<T>): ReactNode => null
Case.displayName = 'Case'

const DefaultCase = (_props: DefaultCaseProps): ReactNode => null
DefaultCase.displayName = 'DefaultCase'

const SwitchCase = <T,>({ value, children }: SwitchCaseProps<T>): ReactNode => {
  let matched: ReactNode = null
  let defaultCase: ReactNode = null

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return

    if (child.type === Case) {
      const caseProps = child.props as CaseProps<T>
      if (matched === null && caseProps.value === value) {
        matched = caseProps.children
      }
    } else if (child.type === DefaultCase) {
      const defaultProps = child.props as DefaultCaseProps
      defaultCase = defaultProps.children
    }
  })

  return <>{matched ?? defaultCase}</>
}

SwitchCase.displayName = 'SwitchCase'

export { SwitchCase, Case, DefaultCase }
