import React, { FC } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { Meta, Story } from '@storybook/react';
import {
  SiteCard,
  SiteCardData,
  SiteCardDropdownMenu,
  SiteCardThumbnail,
  SiteCardSettings,
  SiteCardDropdownItem,
} from '../../../src/components/SiteCard';
import { Link } from '../../routings/Link/Link';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { WordPressStatusBadge } from '../Badge';
import { StatusLabelName } from '../../interfaces';

type MockSiteCardProps = {
  progress: number;
  containerStatus: StatusLabelName;
};

const mockProps = {
  image: {
    src: 'https://getshifter.io',
    alt: 'Site',
  },
  site: {
    id: 'site_xxx',
    name: 'Stable Value Investment Ltd.',
    domain: 'https://getshifter.io',
    team: {
      name: 'super log name toshow a line break super long names work',
      id: 'team_xxx',
    },
    container_state: 'running',
  },
  siteDetailURL: '/sites/xxx-xxx-xxx',
  wordpressAdminURL: undefined,
};

const MockSiteCard: FC<MockSiteCardProps> = ({ progress, containerStatus }) => {
  return (
    <div className="sites-list">
      <section className="d-flex flex-column site-list-body">
        <SiteCard>
          <ProgressBar now={progress} />
          <SiteCardThumbnail {...mockProps.image} />
          <SiteCardData name={mockProps.site.name}>
            <span className="d-inline-block align-middle site-url">
              <Link href={`${mockProps.site.domain}`}>
                {mockProps.site.domain}
              </Link>
            </span>
            <span className="d-inline-block align-middle text-truncate site-description">
              <span className="mr-2 d-inline-block rounded-circle font-weight-bold text-center site-initial">
                D
              </span>
              <p className="mb-0 d-inline site-description">
                {mockProps.site.team?.name}
              </p>
            </span>
          </SiteCardData>
          <SiteCardSettings
            statusBadge={<WordPressStatusBadge status={containerStatus} />}
            wordpressAdminURL={mockProps.wordpressAdminURL}
            href={mockProps.siteDetailURL}
          >
            <SiteCardDropdownMenu right>
              <SiteCardDropdownItem icon={<FaPlay className="d-block" />}>
                Start WordPress
              </SiteCardDropdownItem>
              <SiteCardDropdownItem icon={<FaStop className="d-block" />}>
                Restart WordPress
              </SiteCardDropdownItem>
            </SiteCardDropdownMenu>
          </SiteCardSettings>
        </SiteCard>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Components/SiteCard/SiteCard',
  component: MockSiteCard,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    containerStatus: {
      options: [
        'stopped',
        'disabled',
        'running',
        'attached',
        'deployed',
        'enabled',
        'pending',
        'starting',
        'building',
        'starting-static',
        'failed',
        'verified',
        'published',
        'onteam',
        'scheduled',
        'ready',
      ],
      control: { type: 'select' },
    },
  },
};

export default meta;

const Template: Story<MockSiteCardProps> = (args) => <MockSiteCard {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {
  progress: 0,
  containerStatus: 'ready',
};