export const SESSION_KEY = 'token';

export enum Providers {
  Google = 'GOOGLE',
  Local = 'LOCAL',
}

export enum UserRoles {
  Admin = 'ADMIN',
  Viewer = 'VIEWER',
}

export const permissionsMap = {
  [UserRoles.Admin]: {
    read: ['all_users'],
    write: ['all_users'],
  },
  [UserRoles.Viewer]: {
    read: ['current_user'],
    write: ['current_user'],
  },
};
