import React, { FC, useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
    AuthFormLayout
} from './Layout'
import { AuthFormHeader } from '../../AuthForm';
import { Button } from '../../Buttons';
import { ImageShifterLogo } from '../../Images';

type MockLoginPageProps = {
  status: '' | 'failure' | 'inprogress';
};
const MockLoginPage: FC<MockLoginPageProps> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  useEffect(() => {
    setCurrentStatus(status);
  }, [status, setCurrentStatus]);
  return (
    <AuthFormLayout
      status={currentStatus}
      >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthFormHeader
          logo={<ImageShifterLogo width="36" height="46" alt="Shifter" />}
          title="Log In"
          variant="login"
        />
        <Button type="submit" block disabled>
          Log In
        </Button>
      </form>
    </AuthFormLayout>
  );
};

const meta: Meta = {
  title: 'Components/AuthForm/Layouts',
  component: MockLoginPage,
  argTypes: {
    status: {
      options: ['default', 'inprogress', 'failure'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

const Template: Story<MockLoginPageProps> = (args) => (
  <MockLoginPage {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {
  status: '',
};
