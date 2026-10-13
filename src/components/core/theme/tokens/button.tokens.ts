// Shared
type ButtonFocusTokens = 'btn-focus-border' | 'btn-focus-ring'
type ButtonAriaTokens = 'btn-aria_invalid-ring' | 'btn-aria_invalid-border'

// DEFAULT
type ButtonDefaultTokens =
  | 'btn-bg'
  | 'btn-foreground'
  | 'btn-hover-bg'
  | 'btn-disabled-bg'
  | 'btn-disabled-foreground'

// DESTRUCTIVE
type ButtonDestructiveTokens =
  | 'btn-destructive-bg'
  | 'btn-destructive-foreground'
  | 'btn-destructive-hover-bg'
  | 'btn-destructive-focus-ring'

// OUTLINE
type ButtonOutlineTokens =
  | 'btn-outline-ring'
  | 'btn-outline-foreground'
  | 'btn-outline-bg'
  | 'btn-outline-hover-bg'
  | 'btn-outline-hover-foreground'
  | 'btn-outline-disabled-ring'
  | 'btn-outline-disabled-foreground'

// SECONDARY
type ButtonSecondaryTokens =
  | 'btn-secondary-bg'
  | 'btn-secondary-foreground'
  | 'btn-secondary-hover-bg'

// SECONDARY OUTLINE
type ButtonSecondaryOutlineTokens =
  | 'btn-secondary_outline-ring'
  | 'btn-secondary_outline-foreground'
  | 'btn-secondary_outline-bg'
  | 'btn-secondary_outline-hover-bg'
  | 'btn-secondary_outline-disabled-ring'
  | 'btn-secondary_outline-disabled-foreground'

// GHOST
type ButtonGhostTokens = 'btn-ghost-bg' | 'btn-ghost-hover-bg' | 'btn-ghost-disabled-foreground'

// LINK
type ButtonLinkTokens = 'btn-link-foreground'

type ButtonToken =
  | ButtonFocusTokens
  | ButtonAriaTokens
  | ButtonDefaultTokens
  | ButtonDestructiveTokens
  | ButtonOutlineTokens
  | ButtonSecondaryTokens
  | ButtonSecondaryOutlineTokens
  | ButtonGhostTokens
  | ButtonLinkTokens

export { type ButtonToken }
