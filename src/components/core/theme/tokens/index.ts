import { type ButtonToken } from './button.tokens'
import { type InputGroupToken } from './input-group.tokens'
import { type InputToken } from './input.tokens'

type TokenValue = string | number | any

type ComponentToken = {
  button: Partial<Record<ButtonToken, TokenValue>>
  input: Partial<Record<InputToken, TokenValue>>
  input_group: Partial<Record<InputGroupToken, TokenValue>>
} & { [key: string]: TokenValue }

export { type ComponentToken, type TokenValue }
