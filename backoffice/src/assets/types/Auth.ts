export {};
declare global {
  type IUser = {
    AccountID?: number;
    UserName?: string;
    Permissions?: Record<string, unknown>;
    PhoneNumber?: string;
  } & {
    IsBlock?: boolean;
  };
  type IPermission = Record<string, number>;
}
