import Profile from './Profile';
import NoPermission from './NoPermission';
import ScholarshipsList from './ScholarshipsList';

export const Screens: Record<string, React.ComponentType<object>> = {
  profile: Profile,
  noPermission: NoPermission,
  scholarships: ScholarshipsList,
};
