export /*#__PURE__*/ const createRippleElement = (
  el: HTMLElement,
  event: KeyboardEvent | MouseEvent
): HTMLSpanElement => {
  const rect = el.getBoundingClientRect()
  const x = 'clientX' in event ? event.clientX - rect.x : el.clientWidth / 2
  const y = 'clientY' in event ? event.clientY - rect.y : el.clientHeight / 2

  const ripple = document.createElement('span')
  const diameter = Math.max(el.clientWidth, el.clientHeight)
  const radius = diameter / 2

  ripple.style.width = ripple.style.height = `${diameter}px`
  ripple.style.left = `${x - radius}px`
  ripple.style.top = `${y - radius}px`
  ripple.classList.add('m3-ripple')
  ripple.addEventListener('animationend', () => {
    ripple.remove()
  })

  return ripple
}

export /*#__PURE__*/ const applyRippleEffect = (
  el: HTMLElement,
  event: KeyboardEvent | MouseEvent
) => {
  el.querySelectorAll('.m3-ripple').forEach(el => el.remove())
  el.prepend(createRippleElement(el, event))
}