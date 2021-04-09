import { createContext } from 'react';

import { ICredentials, IUserForm} from '../../modules/auth/shared/model';

export interface IAuthContext {
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export default createContext<IAuthContext>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
