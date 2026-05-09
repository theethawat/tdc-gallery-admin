/* eslint-disable import/no-named-as-default-member */
import BaseRouter from './BaseRouter';

/**
 * Router factory with common presets for different authentication patterns
 */
export class RouterFactory {
  /**
   * Create a public read, protected write router
   * GET requests are public, POST/PUT/DELETE require authentication
   */
  static createPublicReadProtectedWrite(controller, customRoutes = []) {
    return new BaseRouter(controller, {
      requireAuth: false,
      readAuth: false,
      customRoutes,
    });
  }

  /**
   * Create a fully protected router
   * All operations require authentication
   */
  static createFullyProtected(controller, customRoutes = []) {
    return new BaseRouter(controller, {
      requireAuth: true,
      readAuth: true,
      customRoutes,
    });
  }

  /**
   * Create a public router with no authentication
   */
  static createPublic(controller, customRoutes = []) {
    return new BaseRouter(controller, {
      requireAuth: false,
      readAuth: false,
      customRoutes,
    });
  }
}

/**
 * Helper function to quickly set up a standard CRUD router
 * @param {Object} controller - Controller instance
 * @param {Object} authMiddleware - Auth middleware
 * @param {Object} options - Router options
 * @returns {Router} Express router
 */
export function createCrudRouter(controller, authMiddleware, options = {}) {
  const router = new BaseRouter(controller, options);
  return router.setupRoutes(authMiddleware);
}
