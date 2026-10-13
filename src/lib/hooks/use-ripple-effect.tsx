import { useEffect } from 'react'

const useRippleEffect = () => {
  // This useEffect sets up a global click listener to create ripples.
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Find the closest element with the data-ripple attribute
      const rippleTarget = target.closest<HTMLElement>('[data-ripple="true"]')

      // If no such element is found, do nothing.
      if (!rippleTarget) {
        return
      }

      // Get ripple configuration from data attributes or use defaults
      const duration = parseInt(rippleTarget.dataset.rippleDuration || '450', 10)
      const color = rippleTarget.dataset.rippleColor || 'currentColor' // Default to the element's text color

      // --- Style Automation Fix for Spam Clicking ---
      const isRippling = rippleTarget.dataset.isRippling === 'true'

      // If this is the first ripple, save the original styles before changing them.
      if (!isRippling) {
        rippleTarget.dataset.originalPosition = rippleTarget.style.position
        rippleTarget.dataset.originalOverflow = rippleTarget.style.overflow
        rippleTarget.dataset.isRippling = 'true'
      }

      const computedStyle = window.getComputedStyle(rippleTarget)
      // If position is static, it can't contain absolutely positioned children, so we change it.
      if (computedStyle.position === 'static') {
        rippleTarget.style.position = 'relative'
      }
      rippleTarget.style.overflow = 'hidden'
      // --- End Style Automation ---

      const container = rippleTarget.getBoundingClientRect()
      const size = Math.max(container.width, container.height) * 2
      const x = event.clientX - container.left - size / 2
      const y = event.clientY - container.top - size / 2

      // Create the ripple span element
      const rippleElement = document.createElement('span')

      // Apply styles and animation properties
      rippleElement.className = 'quickbill-ui-ripple-element' // Uses the class from the global <style>
      rippleElement.style.left = `${x}px`
      rippleElement.style.top = `${y}px`
      rippleElement.style.width = `${size}px`
      rippleElement.style.height = `${size}px`
      rippleElement.style.backgroundColor = color
      rippleElement.style.animationDuration = `${duration}ms`

      // Append the ripple to the target and clean up after the animation
      rippleTarget.appendChild(rippleElement)
      setTimeout(() => {
        rippleElement.remove()

        // Check if there are any other ripples still animating on this element.
        const remainingRipples = rippleTarget.querySelectorAll(
          '.quickbill-ui-ripple-element',
        ).length

        // If this was the last ripple, restore the original styles.
        if (remainingRipples === 0) {
          rippleTarget.style.position = rippleTarget.dataset.originalPosition || ''
          rippleTarget.style.overflow = rippleTarget.dataset.originalOverflow || ''
          // Clean up data attributes
          delete rippleTarget.dataset.isRippling
          delete rippleTarget.dataset.originalPosition
          delete rippleTarget.dataset.originalOverflow
        }
      }, duration)
    }

    // Add the listener to the whole document
    document.addEventListener('mousedown', handleMouseDown)

    // Clean up the listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, []) // The empty dependency array ensures this runs only once.
}

export { useRippleEffect }
