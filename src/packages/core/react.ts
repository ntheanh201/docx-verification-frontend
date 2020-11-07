import { update } from './immutability-helper'
import { useState as defaultUseState } from 'react'

export {
  default as React,
  Component,
  PureComponent,
  memo,
  lazy,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  createRef
} from 'react'
export type { FC } from 'react'

export const useState = (initialValue: any) => {
  const [state, monkeyPatchSetState] = defaultUseState(initialValue)

  const setState = (data: any) => {
    let newState = null
    if (typeof data === 'object') {
      newState = update(state, {
        $merge: data
      })
    } else {
      newState = data
    }

    monkeyPatchSetState(newState)
  }

  return [state, setState]
}

export { default as ReactDOM, createPortal } from 'react-dom'
