import renderAuthorize from './renderAuthorize';
import Authorized from './authorized';
import checkPermissions from './checkPermissions';
import AuthorizedRoute from './authorizedRoute';
import Secured from './secured';

Authorized.check = checkPermissions;
Authorized.Route = AuthorizedRoute;
Authorized.Secured = Secured;

export default renderAuthorize(Authorized);
