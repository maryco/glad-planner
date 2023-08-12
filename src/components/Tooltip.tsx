import classNames from "classnames"

type Props = {
  message: string
  positionClass: string
  visible: boolean
}

export function Tooltip(props: Props) {
  const classes = classNames({
    'absolute z-20': true,
    [props.positionClass]: true,
    'bg-blue-700 text-slate-50 p-1 rounded text-xs whitespace-nowrap transition-all': true,
  })

  return (
    <>
    {props.visible && (<span className={classes}>{props.message}</span>)}
    </>
  )
}
