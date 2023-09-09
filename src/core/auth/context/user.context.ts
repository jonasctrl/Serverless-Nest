import { getNamespace } from 'cls-hooked';

import { SessionNamespace } from './namespaces';

export class UserContext {
  public static setUserId(userId: number) {
    const namespace = getNamespace(SessionNamespace.User);
    if (!namespace) {
      throw new Error('Failed to get namespace.');
    }
    namespace.set('userId', userId);
  }

  public static getUserId() {
    const namespace = getNamespace(SessionNamespace.User);
    if (!namespace) {
      throw new Error('Failed to get namespace.');
    }

    const userId = namespace.get('userId');
    if (!userId) {
      throw new Error('Failed to get userId.');
    }

    return Number(userId);
  }
}
