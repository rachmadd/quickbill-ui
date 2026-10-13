import { toastInfoBox } from '@/components/core/infobox'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast, type ToastT } from 'sonner'

const meta: Meta<ToastT> = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['loading', 'success', 'info', 'warning', 'error', 'default', 'normal'],
    },
  },
}
export default meta

type Story = StoryObj<ToastT>

export const Default: Story = {
  args: {
    title: 'This is toast title',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.info("This is toast title")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      toast(args.title, {
        ...args,
      })
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const Info: Story = {
  args: {
    title: 'This is Info Toast',
    type: 'info',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.info("This is Info Toast")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}
export const Success: Story = {
  args: {
    title: 'This is Success Toast',
    type: 'success',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.success("This is Success Toast")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const Error: Story = {
  args: {
    title: 'This is Error Toast',
    type: 'error',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.error("This is Error Toast")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const Warning: Story = {
  args: {
    title: 'This is Warning Toast',
    type: 'warning',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.warning("This is Warning Toast")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const Loading: Story = {
  args: {
    title: 'This is Loading Toast',
    type: 'loading',
    duration: Infinity,
  },
  parameters: {
    docs: {
      source: {
        code: `toast.loading("This is Warning Toast")`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const WithDescription: Story = {
  args: {
    title: 'This is Toast Title',
    type: 'warning',
    duration: Infinity,
    description: 'Description goes here',
  },
  parameters: {
    docs: {
      source: {
        code: `toast.warning("This is Toast Title", { description: 'Description goes here' })`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const WithAction: Story = {
  args: {
    title: 'This is Toast Title',
    type: 'warning',
    duration: Infinity,
    description: 'Description goes here',
    action: {
      label: 'Click Me',
      onClick: () => toast.success('You clicked a toast action'),
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        toast.warning(
          "This is Toast Title", 
          { 
            description: 'Description goes here', 
            action: {
              label: 'Click Me',
              onClick: () => toast.success('You clicked a toast action'),
            }
          }
        )`,
      },
    },
  },
  render(args) {
    const renderToast = () => {
      if (args.type) {
        toast(args.title, {
          ...args,
        })
      }
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Toast
      </Button>
    )
  },
}

export const InfoBox: Story = {
  parameters: {
    docs: {
      source: {
        code: `
          toastInfoBox({
            variant: 'error',
            title: 'This is infobox toast',
            description: 'description',
          })
          `,
      },
    },
  },
  render() {
    const renderToast = () => {
      toastInfoBox({
        variant: 'error',
        title: 'This is infobox toast',
        description: 'description',
      })
    }
    return (
      <Button variant={'outline'} pill={false} onClick={renderToast}>
        Open Infobox Toast
      </Button>
    )
  },
}
