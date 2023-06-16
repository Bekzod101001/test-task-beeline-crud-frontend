import type { Story } from "@storybook/vue3";
import AppChip from "@/components/UI/AppChips/AppChip.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  name: 'UI/AppChip',
  component: AppChip,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    to: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: {type: 'select'},
      options: ['green', 'orange'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: Story = (args) => ({
  components: {AppChip},
  setup() {
    return {args};
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<app-chip v-bind="args">{{ args.text }}</app-chip>',
});


export const Default = Template.bind({});
Default.args = {
  text: 'Never broke again'
};