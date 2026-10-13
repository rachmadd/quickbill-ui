import type { Preview } from '@storybook/react-vite'
import { QuickbillUi } from '../src/components/core/ui-provider'
import { AlertDialogProvider } from '../src/components/hooks/use-alert-dialog'
import { Toaster, type QuickbillToasterProps } from '../src/components/ui/sonner'
import '../src/style.css';
import '../src/preview.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const toasterProps = (context.parameters.quickbillToaster ?? {}) as Partial<QuickbillToasterProps>

      return (
        <QuickbillUi>
          <AlertDialogProvider>
            <Story />
          </AlertDialogProvider>
          <Toaster {...toasterProps} />
        </QuickbillUi>
      )
    },
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Quickbill UI', 'Introduction', 'Core', 'Components', ['Fields', '*'], 'Pages'],
      }
    },
    backgrounds: {
      options: {
        dark: { name: 'Accent', value: '#eaf0ff' },
        light: { name: 'Light', value: 'white' },
      },
    },
    grid: false,
    layout: 'centered',
    actions: { disable: true },
    interactions: { disable: true },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true
      },
      source: {
        type: 'auto',
        excludeDecorators: true,
        dark: true,
        language: 'tsx'
      },
      codePanel: true,
      canvas: {
        sourceState: 'hidden', // or 'hidden'
      },
    },
  },
};

export default preview;
