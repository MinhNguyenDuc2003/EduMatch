export const Root = `/home`;
//#region EFncID Danh sách tính năng
export const EFncID = {
  P01: 'profile',
  U01: 'user',
} as const;
//#endregion

//#region SegUrl khai báo url khi cần dùng chuyển page
export const SegUrl = {
  Profile: `${Root}/${EFncID.P01}`,
  User: `${Root}/${EFncID.U01}`,
} as const;
//#endregion
