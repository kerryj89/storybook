import { global as globalThis } from '@storybook/global';
import type { PartialStoryFn, PlayFunctionContext, StoryContext } from '@storybook/types';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: globalThis.Components.Pre,
  tags: ['component-one', 'component-two', 'autodocs'],
  decorators: [
    (storyFn: PartialStoryFn, context: StoryContext) => {
      return storyFn({
        args: { object: { tags: context.tags } },
      });
    },
  ],
  parameters: { chromatic: { disable: true } },
};

export const Inheritance = {
  tags: ['story-one', 'story-two'],
  play: async ({ canvasElement }: PlayFunctionContext<any>) => {
    const canvas = within(canvasElement);
    await expect(JSON.parse(canvas.getByTestId('pre').innerText)).toEqual({
      tags: ['story-one', 'story-two', 'story'],
    });
  },
  parameters: { chromatic: { disable: false } },
};

export const DocsOnly = {
  tags: ['docs-only'],
};

export const TestOnly = {
  tags: ['test-only'],
};

export const DevOnly = {
  tags: ['dev-only'],
};
