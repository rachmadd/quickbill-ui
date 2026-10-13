/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SourceProps } from '@storybook/addon-docs/blocks'

export const cleanRenderSource: SourceProps['transform'] = async (source) => {
  const prettier = await import('prettier/standalone')
  const prettierPluginBabel = await import('prettier/plugins/babel')
  const prettierPluginEstree = await import('prettier/plugins/estree')
  const formattedSource = await prettier.format(source, {
    parser: 'babel',
    plugins: [
      (prettierPluginBabel as any).default || prettierPluginBabel,
      (prettierPluginEstree as any).default || prettierPluginEstree,
    ] as any[],
  })

  const explicitMatch = formattedSource.match(/render: \(\) => {([\s\S]*?)}/s)
  if (explicitMatch) {
    return explicitMatch[1].trim()
  }

  const implicitMatch = formattedSource.match(/render: \(\) => ([\s\S]*)/s)
  if (implicitMatch) {
    const code = implicitMatch[1].trim()
    if (code.endsWith('}')) {
      return code.slice(0, -1).trim()
    }
    if (code.endsWith('};')) {
      return code.slice(0, -2).trim()
    }
    return code
  }

  return formattedSource
}
