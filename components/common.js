
const Common = React.forwardRef((props, ref) => {
  return (
    <button href={props.href} onClick={props.onClick} ref={ref}>
      Click Me
    </button>
  )
})
export default Common;