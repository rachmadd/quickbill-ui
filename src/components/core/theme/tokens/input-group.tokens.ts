// DEFAULT
type InputGroupDefaultTokens =
  | 'input_group-ring'
  | 'input_group-focus_visible-ring'
  | 'input_group-bg'

// GHOST
type InputGroupGhostTokens = 'input_group-ghost-border' | 'input_group-ghost-bg'

// FILLED
type InputGroupFilledTokens =
  | 'input_group-filled-bg'
  | 'input_group-filled-focus-ring'
  | 'input_group-filled-border'

type InputGroupToken = InputGroupDefaultTokens | InputGroupGhostTokens | InputGroupFilledTokens

export { type InputGroupToken }
