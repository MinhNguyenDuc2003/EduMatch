import Profile from './Profile';
import NoPermission from './NoPermission';

export const Screens: Record<string, React.ComponentType<object>> = {
  profile: Profile,
  noPermission: NoPermission,
};
