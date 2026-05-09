/* eslint-disable import/no-named-as-default-member */
import express from 'express';

/**
 * Base Router class for CRUD operations
 * Provides a standard way to set up resource routers with common HTTP methods
 */
export default class BaseRouter {
  constructor(controller, options = {}) {
    this.router = express.Router();
    this.controller = controller;
    this.options = {
      requireAuth: false,
      readAuth: false,
      customRoutes: [],
      ...options,
    };
    this.middleware = options.middleware || {};
  }

  /**
   * Setup standard CRUD routes
   * @param {Object} authMiddleware - Auth middleware instance
   * @returns {Router} Express router
   */
  setupRoutes(authMiddleware) {
    const auth = this.options.requireAuth ? [authMiddleware.verifyRequest] : [];
    const readAuth = this.options.readAuth
      ? [authMiddleware.verifyRequest]
      : [];

    // READ routes
    this.router.get('/', ...readAuth, this.controller.onReadAll);
    this.router.get('/:id', ...readAuth, this.controller.onReadOne);

    // CREATE route
    this.router.post('/', ...auth, this.controller.onCreateOne);

    // UPDATE route
    this.router.put('/:id', ...auth, this.controller.onEditOne);

    // DELETE route
    this.router.delete('/:id', ...auth, this.controller.onDeleteOne);

    // Add custom routes if provided
    this.addCustomRoutes(authMiddleware);

    return this.router;
  }

  /**
   * Add custom routes for specific resources
   * @param {Object} authMiddleware - Auth middleware instance
   */
  addCustomRoutes(authMiddleware) {
    this.options.customRoutes.forEach((route) => {
      const { method, path, handler, protected: isProtected } = route;
      const middleware = isProtected ? authMiddleware.verifyRequest : [];

      if (method.toLowerCase() === 'post') {
        this.router.post(path, middleware, handler);
      } else if (method.toLowerCase() === 'put') {
        this.router.put(path, middleware, handler);
      } else if (method.toLowerCase() === 'get') {
        this.router.get(path, middleware, handler);
      } else if (method.toLowerCase() === 'delete') {
        this.router.delete(path, middleware, handler);
      }
    });
  }

  /**
   * Add custom middleware to specific routes
   * @param {string} routePath - Route path
   * @param {function|array} middlewares - Middleware function(s)
   */
  addMiddleware(routePath, middlewares) {
    this.middleware[routePath] = middlewares;
  }

  /**
   * Get the configured router instance
   * @returns {Router} Express router
   */
  getRouter() {
    return this.router;
  }
}
