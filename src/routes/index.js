import RootRoute from './RootRoute';
import NotFoundRoute from './NotFoundRoute';
import { getContentRoutes } from './ContentRoutes';

export default [RootRoute, ...getContentRoutes(), NotFoundRoute];
