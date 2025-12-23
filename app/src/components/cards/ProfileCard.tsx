import React from 'react';
import { ProfileCard as ProfileCardType } from '@shared/types/profile-card';
import { CardRenderer } from './CardRenderer';
import { CardAction } from '@shared/types/card';
import { ProfileCardExpanded } from './ProfileCardExpanded';

interface ProfileCardProps {
  profile: ProfileCardType;
  onAction?: (action: CardAction) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onAction,
  className,
  defaultExpanded,
}) => {
  return (
    <CardRenderer
      card={profile}
      onAction={onAction}
      className={className}
      defaultExpanded={defaultExpanded}
      renderSection={(section) => (
        <ProfileCardExpanded section={section} profile={profile} />
      )}
    />
  );
};
