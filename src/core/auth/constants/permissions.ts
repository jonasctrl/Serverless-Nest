export enum UserRoles {
  Admin = 'ADMIN',
  Viewer = 'VIEWER',
}

export enum PermissionActions {
  Read = 'READ',
  Write = 'WRITE',
}

export enum PermissionScopes {
  all = '*',
  user = 'USER',
}

export const permissionsMap: Map<UserRoles, { [key in PermissionActions]: PermissionScopes[] }> =
  new Map([
    [
      UserRoles.Admin,
      {
        [PermissionActions.Read]: [PermissionScopes.all],
        [PermissionActions.Write]: [PermissionScopes.all],
      },
    ],
    [
      UserRoles.Viewer,
      {
        [PermissionActions.Read]: [PermissionScopes.user],
        [PermissionActions.Write]: [PermissionScopes.user],
      },
    ],
  ]);
