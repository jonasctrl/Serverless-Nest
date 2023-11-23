import { PermissionActions, PermissionScopes, UserRoles } from './roles';

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
