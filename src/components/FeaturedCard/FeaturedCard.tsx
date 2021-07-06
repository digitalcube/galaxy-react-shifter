import React, { FC } from 'react';
import { FaFile } from 'react-icons/fa';
import { ReactNode } from 'react';
import { ExternalButtonLink } from '../ExternalLink/ExternalButtonLink';

export type FeaturedCardProps = {
  href?: string;
  linkIcon?: ReactNode;
  linkText?: string;
  excerpt?: ReactNode;
  icon?: ReactNode;
  title: string;
};
export const FeaturedCard: FC<FeaturedCardProps> = ({
  href,
  linkIcon,
  icon,
  excerpt,
  title,
  linkText,
}) => {
  return (
    <div className="pt-4 px-4 h-100 position-relative guide-list-item">
      <div className="guides-list-icon">
        <i aria-hidden="true">{icon || <FaFile className="d-block" />}</i>
      </div>
      <h3 className="mt-4 font-weight-bold guide-list-title">{title}</h3>
      {typeof excerpt === 'string' ? (
        <p className="mb-0 guide-list-excerpt">{excerpt}</p>
      ) : (
        excerpt
      )}
      {linkText && href ? (
        <div className="position-absolute guide-list-anchor">
          <ExternalButtonLink href={href} icon={linkIcon}>
            {linkText}
          </ExternalButtonLink>
        </div>
      ) : null}
    </div>
  );
};