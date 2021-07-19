import React, { FC } from 'react';
import { useMemo } from 'react';
import { StatusLabelName } from '../../interfaces';

export type StatusBadgeProps = {
  status?: StatusLabelName | '';
  className?: string;
  labelPrefix?: string;
};
export const StatusBadge: FC<StatusBadgeProps> = ({
  status,
  className,
  labelPrefix,
}) => {
  const statusClassName = useMemo(() => {
    switch (status) {
      case 'stopped':
      case 'running':
      case 'starting':
      case 'starting-static':
        return `c-is-site-${status}`;
      case 'attached':
      case 'deployed':
      case 'enabled':
      case 'failed':
      case 'verified':
      case 'pending':
      case 'disabled':
        return `c-is-${status}`;
      case 'building':
      case 'published':
      case 'onteam':
      case 'scheduled':
      case 'ready':
      default:
        return `c-${status}`;
    }
  }, [status]);
  const classNames = [
    'rounded font-weight-bold c-site-status',
    statusClassName,
    className,
  ].filter(Boolean);
  const label = useMemo(() => {
    if (!status) return '';
    return [
      labelPrefix ? `${labelPrefix} ` : '',
      status.charAt(0).toUpperCase() + status.slice(1),
    ].filter(Boolean);
  }, [status, labelPrefix]);

  if (!status) return null;
  return (
    <div className="ml-4 site-status">
      <div className={classNames.join(' ')}>{label}</div>
    </div>
  );
};