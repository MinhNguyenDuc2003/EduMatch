import User from './User';
import Profile from './Profile';
import NoPermission from './NoPermission';
import FormScholarship from './FormScholarship';
import ScholarshipsList from './ScholarshipsList';

export const Screens: Record<string, React.ComponentType<object>> = {
  user: User,
  profile: Profile,
  formScholarship: FormScholarship,
  noPermission: NoPermission,
  scholarshipsList: ScholarshipsList,
};
