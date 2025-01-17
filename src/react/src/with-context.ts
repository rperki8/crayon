import React from 'react'
import { Request, Response, Router } from 'crayon';

export const withContext = <T = any>(context: React.Context<any>, contextState?: T) => {
  const apply = (Component: any) => () =>
    React.createElement(context.Provider, { value: contextState }, 
      React.createElement(Component, null))

  return (req: Request, res: Response, state: Record<string, any>, app: Router) => {
    const mount = res.mount
    res.mount = (c: any) => {
      mount(apply(c))
    }
  }
}