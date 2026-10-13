import { Flex } from '@/components/core/flex'
import QueryRenderer from '@/components/core/query-renderer.js'
import { TypographyContent } from '@/components/core/typography'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

const meta: Meta<typeof QueryRenderer> = {
  title: 'Components/QueryRenderer',
  component: QueryRenderer,
}

export default meta
type Story = StoryObj<typeof QueryRenderer>

export const Primary: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(true)
    const data = [{ name: 'John Doe', address: 'Los Angeles' }]
    const handleRetry = () => {
      setIsLoading(false)
      setIsError(false)
    }

    return (
      <div className="flex flex-col gap-4">
        <QueryRenderer
          {...args}
          loading={isLoading}
          error={isError}
          data={isLoading ? undefined : data[0]}
          loadingRender={<Skeleton style={{ height: 184, width: 300 }} />}
          render={(data) => (
            <Flex className="flex flex-col gap-2">
              <Flex className="flex flex-row gap-12">
                <TypographyContent>Name</TypographyContent>
                <TypographyContent>: {data.name}</TypographyContent>
              </Flex>

              <Flex className="flex flex-row gap-8">
                <TypographyContent>Address</TypographyContent>
                <TypographyContent>: {data.address}</TypographyContent>
              </Flex>
            </Flex>
          )}
          errorRender={
            <TypographyContent className="text-red-500">Something went wrong!</TypographyContent>
          }
        />
        {isLoading && (
          <Button onClick={handleRetry} className="w-32 self-center">
            Load Data
          </Button>
        )}
      </div>
    )
  },
}
