export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  block = false,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'ghost' && 'btn-ghost',
    size === 'sm' && 'btn-sm',
    block && 'btn-block',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...rest}>
      {Icon && iconPosition === 'left' && <Icon size={17} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={17} />}
    </button>
  )
}
