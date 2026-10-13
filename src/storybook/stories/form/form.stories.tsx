import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form, FormField } from '@/components/ui/custom/form'
import { Input } from '@/components/ui/composed/input'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/custom/radio-group'
import { Select } from '@/components/ui/composed/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
}

export default meta
type Story = StoryObj<typeof Form>

type BasicFormValues = {
  name: string
  email: string
}

export const Basic: Story = {
  render: () => (
    <Form<BasicFormValues>
      onSubmit={(data) => {
        toast.success('Form submitted!', {
          description: JSON.stringify(data, null, 2),
        })
      }}
    >
      <div className="max-w-md space-y-4">
        <FormField<BasicFormValues>
          name="name"
          label="Name"
          required
          render={({ field }) => <Input {...field} placeholder="Enter your name" />}
        />

        <FormField<BasicFormValues>
          name="email"
          label="Email"
          required
          render={({ field }) => <Input {...field} placeholder="Enter your email" />}
        />

        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
}

type RegistrationFormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
  role: string
  acceptTerms: boolean
}

export const Registration: Story = {
  render: () => (
    <Form<RegistrationFormValues>
      onSubmit={(data) => {
        toast.success('Registration successful!', {
          description: `Welcome, ${data.username}!`,
        })
      }}
    >
      <div className="max-w-md space-y-4">
        <FormField<RegistrationFormValues>
          name="username"
          label="Username"
          required
          description="Choose a unique username"
          render={({ field }) => <Input {...field} placeholder="johndoe" />}
        />

        <FormField<RegistrationFormValues>
          name="email"
          label="Email"
          required
          render={({ field }) => <Input {...field} type="email" placeholder="john@example.com" />}
        />

        <FormField<RegistrationFormValues>
          name="password"
          label="Password"
          required
          render={({ field }) => <Input {...field} type="password" placeholder="••••••••" />}
        />

        <FormField<RegistrationFormValues>
          name="confirmPassword"
          label="Confirm Password"
          required
          render={({ field }) => <Input {...field} type="password" placeholder="••••••••" />}
        />

        <FormField<RegistrationFormValues>
          name="role"
          label="Role"
          required
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(option) => field.onChange(option?.value)}
              placeholder="Select a role"
              items={[
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
                { label: 'Guest', value: 'guest' },
              ]}
            />
          )}
        />

        <FormField<RegistrationFormValues>
          name="acceptTerms"
          label=""
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              <label className="text-sm">I accept the terms and conditions</label>
            </div>
          )}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
    </Form>
  ),
}

type PaymentFormValues = {
  routingType: string
}

export const WithRadioGroup: Story = {
  render: () => (
    <Form<PaymentFormValues>
      onSubmit={(data) => {
        toast.success('Settings saved!', {
          description: `Routing type: ${data.routingType}`,
        })
      }}
      defaultValues={{
        routingType: 'default',
      }}
    >
      <div className="max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Payment Gateway Routing Type</h3>

        <FormField<PaymentFormValues>
          name="routingType"
          label=""
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              orientation="vertical"
              radioPosition="end"
              customRender={(item, isSelected, radio) => (
                <div
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 ${
                    isSelected ? 'border-qb-primary bg-qb-primary/5' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="text-qb-mist-80 text-sm font-semibold">{item.label}</div>
                    <div className="text-qb-mist-60 text-xs">{item.description}</div>
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-qb-primary text-xs hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Lihat detail
                      </a>
                    )}
                  </div>
                  {radio}
                </div>
              )}
              items={[
                {
                  label: 'Default',
                  value: 'default',
                  description:
                    'Based on Priority and availability. Select the highest priority that available.',
                  link: '#',
                },
                {
                  label: 'Weighted Cap',
                  value: 'weighted',
                  description: 'Based on priority, availability and Monthly Max Cap.',
                  link: '#',
                },
              ]}
            />
          )}
        />

        <Button type="submit" className="w-full">
          Save Settings
        </Button>
      </div>
    </Form>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Form<BasicFormValues>
      onSubmit={(data) => {
        toast.success('Form submitted!', {
          description: JSON.stringify(data, null, 2),
        })
      }}
      mode="onChange"
    >
      <div className="max-w-md space-y-4">
        <FormField<BasicFormValues>
          name="name"
          label="Name"
          required
          description="Enter your full name"
          render={({ field }) => <Input {...field} placeholder="John Doe" />}
        />

        <FormField<BasicFormValues>
          name="email"
          label="Email"
          required
          description="We'll never share your email"
          render={({ field }) => <Input {...field} placeholder="john@example.com" />}
        />

        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
}

type ErrorFormValues = {
  username: string
  email: string
  password: string
}

export const WithErrors: Story = {
  render: () => (
    <Form<ErrorFormValues>
      onSubmit={(data) => {
        toast.success('Form submitted!', {
          description: JSON.stringify(data, null, 2),
        })
      }}
      mode="onSubmit"
    >
      <div className="max-w-md space-y-4">
        <p className="text-qb-mist-60 mb-4 text-sm">
          Try submitting the form without filling the fields to see error messages
        </p>

        <FormField<ErrorFormValues>
          name="username"
          label="Username"
          required
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Enter username" />}
        />

        <FormField<ErrorFormValues>
          name="email"
          label="Email"
          required
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Enter email" />}
        />

        <FormField<ErrorFormValues>
          name="password"
          label="Password"
          required
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
          render={({ field }) => <Input {...field} type="password" placeholder="Enter password" />}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </Form>
  ),
}

export const DisabledFields: Story = {
  render: () => (
    <Form<BasicFormValues>
      onSubmit={(data) => {
        toast.success('Form submitted!', {
          description: JSON.stringify(data, null, 2),
        })
      }}
      defaultValues={{
        name: 'John Doe',
        email: 'john@example.com',
      }}
    >
      <div className="max-w-md space-y-4">
        <p className="text-qb-mist-60 mb-4 text-sm">
          Some fields are disabled and cannot be edited
        </p>

        <FormField<BasicFormValues>
          name="name"
          label="Name"
          required
          description="This field is disabled"
          render={({ field }) => <Input {...field} disabled placeholder="Enter your name" />}
        />

        <FormField<BasicFormValues>
          name="email"
          label="Email"
          required
          render={({ field }) => <Input {...field} placeholder="Enter your email" />}
        />

        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
}

export const DebugMode: Story = {
  render: () => (
    <Form<BasicFormValues>
      onSubmit={(data) => {
        toast.success('Form submitted!', {
          description: JSON.stringify(data, null, 2),
        })
      }}
      debugMode
    >
      <div className="max-w-md space-y-4">
        <p className="text-qb-mist-60 text-sm">
          Check the console to see field values in real-time
        </p>

        <FormField<BasicFormValues>
          name="name"
          label="Name"
          render={({ field }) => <Input {...field} placeholder="Type something..." />}
        />

        <FormField<BasicFormValues>
          name="email"
          label="Email"
          render={({ field }) => <Input {...field} placeholder="email@example.com" />}
        />

        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
}
