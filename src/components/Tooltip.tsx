import classNames from 'classnames'
import { ReactNode, memo, useState } from 'react'

type Props = {
  message: string
  positionClass: string
  children: ReactNode
  delay?: number
}

export const Tooltip = memo(function Tooltip(props: Props) {
  const children = props.children
  const delay = props?.delay || 700
  const classes = classNames({
    'absolute z-20': true,
    [props.positionClass]: true,
    'bg-blue-700 text-slate-50 p-1 rounded text-xs whitespace-nowrap transition-all':
      true,
  })
  const [visibleState, setVisibleState] = useState<boolean>(false)

  const toggle = () => {
    setVisibleState(true)
    setTimeout(() => {
      setVisibleState(false)
    }, delay)
  }

  return (
    <>
    <div onClick={toggle}>
      {visibleState && <span className={classes}>{props.message}</span>}
      { children }
    </div>
    </>
  )
})
