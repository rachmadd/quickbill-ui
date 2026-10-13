// DEFAULT
type InputDefaultTokens =
  | 'inp-border'
  | 'inp-focus-border'
  | 'inp-focus-ring'
  | 'inp-bg'
  | 'inp-placeholder-foreground'
  | 'inp-selection-bg'
  | 'inp-selection-foreground'
  | 'inp-disabled-bg'
  | 'inp-disabled-foreground'
  | 'inp-disabled-placeholder-foreground'
  | 'inp-file-foreground'
  | 'inp-file-bg'
  | 'inp-aria_invalid-ring'
  | 'inp-aria_invalid-border'

// GHOST
type InputGhostTokens = 'inp-ghost-bg'

// FILLED
type InputFilledTokens = 'inp-filled-bg' | 'inp-filled-focus-ring' | 'inp-filled-border'

type InputToken = InputDefaultTokens | InputGhostTokens | InputFilledTokens

export { type InputToken }
