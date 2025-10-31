import Profile from './Profile';
import ProviderProfile from './ProviderProfile';
import NoPermission from './NoPermission';
import ScholarshipsList from './ScholarshipsList';

export const Screens: Record<string, React.ComponentType<object>> = {
  profile: Profile,
  providerProfile: ProviderProfile,
  noPermission: NoPermission,
  scholarships: ScholarshipsList,
};
