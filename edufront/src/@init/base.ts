export const Root = `/home`;
//#region EFncID Danh sách tính năng
export const EFncID = {
  P01: 'profile',
  U01: 'user',
  F01: 'formScholarship',
} as const;
//#endregion

//#region SegUrl khai báo url khi cần dùng chuyển page
export const SegUrl = {
  Profile: `${Root}/${EFncID.P01}`,
  User: `${Root}/${EFncID.U01}`,
  FormScholarship: `${Root}/${EFncID.F01}`,
} as const;
//#endregion
