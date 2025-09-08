
import User from "./User";
import Profile from "./Profile";
import NoPermission from "./NoPermission";



export const Screens: Record<string, React.ComponentType<object>> = {
  user: User,
  profile: Profile,
  noPermission: NoPermission
};
