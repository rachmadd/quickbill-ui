import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icons'
import { ThemeInjector } from '@/components/core/theme'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryDecorator } from '../../components/story-decorator'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  tags: ['autodocs', 'experimental'],
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Button>

/**
 * Interactive playground to configure the button. Adjust props in the Controls panel to explore all available options.
 */
export const Default: Story = {
  name: 'Button',
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    loading: false,
    pill: true,
  },
}

/**
 * Configurable button variant. Available options: `secondary`, `secondary-outline`, `destructive`, `outline`, `ghost`, `link`.
 * Default is `default` which acts as the primary button. The second row shows variants on a tinted background.
 */
export const Variants: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    loading: false,
    pill: true,
  },
  decorators: (Story) => (
    <>
      <StoryDecorator>
        <Story />
      </StoryDecorator>
      <StoryDecorator className="bg-qb-blue-15">
        <Story />
      </StoryDecorator>
    </>
  ),
  render: (args) => {
    return (
      <ThemeInjector
        tokens={{
          button: {
            'btn-bg': '#FF0000',
            'btn-secondary-bg': '#019999',
          },
          input: {
            'inp-border': '#00FFFF',
          },
          'unknown-token': '#129310',
        }}
      >
        <Button {...args}>Default</Button>
        <Button variant={'secondary'}>Secondary</Button>
        <Button variant={'secondary-outline'}>Secondary</Button>
        <Button variant={'destructive'}>Destructive</Button>
        <Button variant={'outline'}>Outlined</Button>
        <Button variant={'ghost'}>Ghost</Button>
        <Button variant={'link'}>Link</Button>
      </ThemeInjector>
    )
  },
}

/**
 * All available sizes from `xs` to `lg` and four icon-only variants. The second row shows the same sizes with `pill={false}` and `outline` variant for shape comparison.
 */
export const Sizes: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    loading: false,
    pill: true,
  },
  decorators: (Story) => (
    <>
      <StoryDecorator>
        <Story />
      </StoryDecorator>
      <StoryDecorator>
        <Story args={{ pill: false, variant: 'outline' }} />
      </StoryDecorator>
    </>
  ),
  render: (args) => {
    return (
      <>
        <Button variant={args.variant} pill={args.pill} size={'xs'}>
          Xtra small
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'sm'}>
          Small
        </Button>
        <Button {...args}>Default</Button>
        <Button variant={args.variant} pill={args.pill} size={'lg'}>
          Large
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'icon-xs'}>
          <Icon name="ArrowUpOutlined" />
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'icon-sm'}>
          <Icon name="ArrowUpOutlined" />
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'icon'}>
          <Icon name="ArrowUpOutlined" />
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'icon-lg'}>
          <Icon name="ArrowUpOutlined" />
        </Button>
      </>
    )
  },
}

/**
 * Controls the border radius. `pill={true}` (default) uses `rounded-full` for a capsule shape. `pill={false}` uses `rounded-md` for a squared look. Both work across all sizes and variants.
 */
export const Pill: Story = {
  decorators: (Story) => (
    <>
      <StoryDecorator description="pill={true} — capsule shape (default)">
        <Story />
      </StoryDecorator>
      <StoryDecorator description="pill={false} — rounded rectangle">
        <Story args={{ pill: false }} />
      </StoryDecorator>
    </>
  ),
  render: (args) => (
    <>
      <Button {...args} variant="default" size="xs">
        Xtra small
      </Button>
      <Button {...args} variant="default" size="sm">
        Small
      </Button>
      <Button {...args} variant="default" size="default">
        Default
      </Button>
      <Button {...args} variant="default" size="lg">
        Large
      </Button>
      <Button {...args} variant="outline" size="default">
        Outlined
      </Button>
    </>
  ),
  args: {
    pill: true,
  },
}

/**
 * Icon-only buttons are used for compact actions where a label would take up too much space. Available in four sizes: `icon-xs`, `icon-sm`, `icon`, and `icon-lg`. Works with all variants.
 */
export const IconOnly: Story = {
  decorators: (Story) => (
    <>
      <StoryDecorator description="Default">
        <Story />
      </StoryDecorator>
      <StoryDecorator description="Outline">
        <Story args={{ variant: 'outline' }} />
      </StoryDecorator>
      <StoryDecorator description="Ghost">
        <Story args={{ variant: 'ghost' }} />
      </StoryDecorator>
    </>
  ),
  render: (args) => (
    <>
      <Button {...args} size="icon-xs">
        <Icon name="PlusOutlined" />
      </Button>
      <Button {...args} size="icon-sm">
        <Icon name="PlusOutlined" />
      </Button>
      <Button {...args} size="icon">
        <Icon name="PlusOutlined" />
      </Button>
      <Button {...args} size="icon-lg">
        <Icon name="PlusOutlined" />
      </Button>
    </>
  ),
  args: {
    variant: 'default',
    pill: true,
  },
}

/**
 * A leading icon sits to the left of the label. Icon sizing adapts automatically to the button size via the `[&>svg]:size-*` utility baked into each size variant.
 */
export const WithIcon: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    pill: true,
  },
  decorators: (Story) => (
    <>
      <StoryDecorator>
        <Story />
      </StoryDecorator>
    </>
  ),
  render: (args) => {
    return (
      <>
        <Button variant={args.variant} pill={args.pill} size={'xs'}>
          <Icon name="PlusOutlined" />
          Xtra small
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'sm'}>
          <Icon name="PlusOutlined" />
          Small
        </Button>
        <Button {...args}>
          <Icon name="PlusOutlined" />
          Default
        </Button>
        <Button variant={args.variant} pill={args.pill} size={'lg'}>
          <Icon name="PlusOutlined" />
          Large
        </Button>
      </>
    )
  },
}

/**
 * A trailing icon sits to the right of the label — useful for indicating direction or a secondary action such as expand, navigate, or download.
 */
export const WithIconTrailing: Story = {
  decorators: (Story) => (
    <StoryDecorator>
      <Story />
    </StoryDecorator>
  ),
  render: (args) => (
    <>
      <Button {...args} size="xs">
        Xtra small
        <Icon name="ArrowRightOutlined" />
      </Button>
      <Button {...args} size="sm">
        Small
        <Icon name="ArrowRightOutlined" />
      </Button>
      <Button {...args} size="default">
        Default
        <Icon name="ArrowRightOutlined" />
      </Button>
      <Button {...args} size="lg">
        Large
        <Icon name="ArrowRightOutlined" />
      </Button>
    </>
  ),
  args: {
    variant: 'default',
    pill: true,
  },
}

/**
 * The loading state disables pointer interaction and overlays a spinner. All variants support loading. The spinner inherits the button background to blend with each style.
 */
export const Loading: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    loading: true,
    pill: true,
  },
  decorators: (Story) => (
    <>
      <StoryDecorator>
        <Story />
      </StoryDecorator>
      <StoryDecorator className="bg-qb-blue-15">
        <Story />
      </StoryDecorator>
    </>
  ),
  render: (args) => {
    return (
      <>
        <Button {...args}>Default</Button>
        <Button {...args} variant={'secondary'}>
          Secondary
        </Button>
        <Button {...args} variant={'secondary-outline'}>
          Secondary
        </Button>
        <Button {...args} variant={'destructive'}>
          Destructive
        </Button>
        <Button {...args} variant={'outline'}>
          Outlined
        </Button>
        <Button {...args} variant={'ghost'}>
          Ghost
        </Button>
        <Button {...args} variant={'link'}>
          Link
        </Button>
      </>
    )
  },
}

/**
 * The disabled state prevents all interactions. Each variant applies distinct muted styles to maintain visual contrast without implying interactivity.
 */
export const Disabled: Story = {
  args: {
    children: 'Submit',
    variant: 'default',
    size: 'default',
    pill: true,
    disabled: true,
  },
  decorators: (Story) => (
    <>
      <StoryDecorator>
        <Story />
      </StoryDecorator>
      <StoryDecorator className="bg-qb-blue-15">
        <Story />
      </StoryDecorator>
    </>
  ),
  render: (args) => {
    return (
      <>
        <Button {...args}>Default</Button>
        <Button {...args} variant={'secondary'}>
          Secondary
        </Button>
        <Button {...args} variant={'secondary-outline'}>
          Secondary
        </Button>
        <Button {...args} variant={'destructive'}>
          Destructive
        </Button>
        <Button {...args} variant={'outline'}>
          Outlined
        </Button>
        <Button {...args} variant={'ghost'}>
          Ghost
        </Button>
        <Button {...args} variant={'link'}>
          Link
        </Button>
      </>
    )
  },
}

/**
 * When `largerInMobile` is `true`, the button renders at `lg` size below the `sm` breakpoint and reverts to the specified `size` on larger screens.
 * Use the viewport toolbar in Storybook to switch to a mobile viewport and observe the size change.
 *
 * ```tsx
 * <Button size="default" largerInMobile>Submit</Button>
 * ```
 */
export const LargerInMobile: Story = {
  decorators: (Story) => (
    <>
      <StoryDecorator description="largerInMobile={true} — grows to lg on mobile, reverts to specified size on sm+">
        <Story />
      </StoryDecorator>
      <StoryDecorator description="largerInMobile={false} — size stays fixed at all viewports">
        <Story args={{ largerInMobile: false }} />
      </StoryDecorator>
    </>
  ),
  render: (args) => (
    <>
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
    </>
  ),
  args: {
    variant: 'default',
    pill: true,
    largerInMobile: true,
  },
}

/**
 * Pass `className="w-full"` to stretch the button to its container width. Commonly used inside form footers, modal action bars, and mobile-first layouts.
 *
 * ```tsx
 * <Button className="w-full">Submit</Button>
 * ```
 */
export const FullWidth: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...args} variant="default" className="w-full">
        Submit
      </Button>
      <Button {...args} variant="outline" className="w-full">
        Cancel
      </Button>
      <Button {...args} variant="ghost" className="w-full">
        Skip
      </Button>
    </div>
  ),
  args: {
    size: 'default',
    pill: true,
  },
}
