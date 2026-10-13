import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Typography,
  TypographyContent,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLink,
  TypographyTitle,
} from '@/components/core/typography'

const meta: Meta<typeof Typography> = {
  title: 'Core/Typography',
  component: Typography,
  subcomponents: {
    TypographyH1: TypographyH1,
    TypographyH2: TypographyH2,
    TypographyH3: TypographyH3,
    TypographyTitle: TypographyTitle,
    TypographyContent: TypographyContent,
    TypographyLink: TypographyLink,
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Heading1: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyH1>Almost before we knew it, we had left the ground.</TypographyH1>`,
      },
    },
  },
  render: (args) => <TypographyH1 {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Heading2: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyH2>Almost before we knew it, we had left the ground.</TypographyH2>`,
      },
    },
  },
  render: (args) => <TypographyH2 {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Heading3: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyH3>Almost before we knew it, we had left the ground.</TypographyH3>`,
      },
    },
  },
  render: (args) => <TypographyH3 {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Title: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyTitle>Almost before we knew it, we had left the ground.</TypographyTitle>`,
      },
    },
  },
  render: (args) => <TypographyTitle {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const TitleStrong: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyTitle strong>Almost before we knew it, we had left the ground.</TypographyTitle>`,
      },
    },
  },
  render: (args) => <TypographyTitle strong {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const TitleSmall: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyTitle level="sm">Almost before we knew it, we had left the ground.</TypographyTitle>`,
      },
    },
  },
  render: (args) => <TypographyTitle level="sm" {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const TitleSmallStrong: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyTitle level="sm" strong>Almost before we knew it, we had left the ground.</TypographyTitle>`,
      },
    },
  },
  render: (args) => <TypographyTitle level="sm" strong {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Content: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyContent>Almost before we knew it, we had left the ground.</TypographyContent>`,
      },
    },
  },
  render: (args) => <TypographyContent {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const ContentStrong: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyContent strong>Almost before we knew it, we had left the ground.</TypographyContent>`,
      },
    },
  },
  render: (args) => <TypographyContent strong {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const ContentSmall: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyContent level="sm">Almost before we knew it, we had left the ground.</TypographyContent>`,
      },
    },
  },
  render: (args) => <TypographyContent level="sm" {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const ContentSmallStrong: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyContent level="sm" strong>Almost before we knew it, we had left the ground.</TypographyContent>`,
      },
    },
  },
  render: (args) => <TypographyContent level="sm" strong {...args} />,
  args: {
    children: 'Almost before we knew it, we had left the ground.',
  },
}

export const Link: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyLink>Click here</TypographyLink>`,
      },
    },
  },
  render: () => <TypographyLink>Click here</TypographyLink>,
  args: {
    children: 'Click here',
  },
}

export const LinkSmall: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TypographyLink level="sm">Click here</TypographyLink>`,
      },
    },
  },
  render: () => <TypographyLink level="sm">Click here</TypographyLink>,
  args: {
    children: 'Click here',
  },
}
