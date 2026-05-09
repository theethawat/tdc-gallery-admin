# Router Refactoring - OOP Guide

## Overview

The routers have been refactored using Object-Oriented Programming principles with a `BaseRouter` class and `RouterFactory` utility functions. This reduces code duplication and makes it easier to maintain and extend routers.

## Architecture

### BaseRouter Class
Located in `BaseRouter.js`, this is the foundation for all CRUD routers. It provides:
- Standard CRUD route setup (GET all, GET one, POST create, PUT update, DELETE)
- Flexible authentication configuration
- Custom route support for resource-specific endpoints

### RouterFactory
Located in `RouterFactory.js`, provides factory methods for common router patterns:
- `createPublicReadProtectedWrite()` - Public reads, protected writes (default)
- `createFullyProtected()` - All operations require authentication
- `createPublic()` - No authentication required
- `createCrudRouter()` - Direct function for custom configurations

## Usage Examples

### 1. Simple CRUD Router (Public Read, Protected Write)
```javascript
// controllers/category.js equivalent
import categoryController from '../controllers/category';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(categoryController, authMiddleWare, {
  requireAuth: false,
  readAuth: false,
});

export default router;
```

### 2. Fully Protected Router (All Operations Require Auth)
```javascript
import peopleController from '../controllers/people';
import authMiddleWare from '../middleware/auth';
import { createCrudRouter } from './RouterFactory';

const router = createCrudRouter(peopleController, authMiddleWare, {
  requireAuth: true,
  readAuth: true,
});

export default router;
```

### 3. Router with Custom Routes (File Upload Example)
```javascript
import imageController from '../controllers/image';
import authMiddleWare from '../middleware/auth';
import BaseRouter from './BaseRouter';
import multer from 'multer';

// Configure multer
const upload = multer({ storage: multer.memoryStorage() });

// Setup base CRUD routes
const baseRouter = new BaseRouter(imageController, {
  requireAuth: false,
  readAuth: false,
});

const router = baseRouter.setupRoutes(authMiddleWare);

// Add custom routes
router.post(
  '/upload',
  authMiddleWare.verifyRequest,
  upload.single('files'),
  imageController.onUploadFile,
);

export default router;
```

### 4. Router with Custom Authentication Routes (User Example)
```javascript
import userController from '../controllers/user';
import authMiddleWare from '../middleware/auth';
import BaseRouter from './BaseRouter';
import passport from '../configs/passport';

// Setup base CRUD routes
const baseRouter = new BaseRouter(userController, {
  requireAuth: false,
  readAuth: false,
});

const router = baseRouter.setupRoutes(authMiddleWare);

// Add custom auth routes
router.post('/register', userController.onCreateOne);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  userController.onLogin,
);

export default router;
```

## Creating New Routes

For a new resource (e.g., `Gift`):

1. **If it follows standard CRUD with public reads and protected writes:**
   ```javascript
   import giftController from '../controllers/gift';
   import authMiddleWare from '../middleware/auth';
   import { createCrudRouter } from './RouterFactory';

   const router = createCrudRouter(giftController, authMiddleWare, {
     requireAuth: false,
     readAuth: false,
   });

   export default router;
   ```

2. **If it's a new fully protected resource:**
   ```javascript
   import { createCrudRouter } from './RouterFactory';
   import specialMomentController from '../controllers/special-moment';
   import authMiddleWare from '../middleware/auth';

   const router = createCrudRouter(specialMomentController, authMiddleWare, {
     requireAuth: true,
     readAuth: true,
   });

   export default router;
   ```

3. **Update `api.js` to register the new router:**
   ```javascript
   import gift from './gift.routes';
   
   router.use('/gift', gift);
   ```

## Configuration Options

When creating a router, you can pass these options:

| Option | Type | Description |
|--------|------|-------------|
| `requireAuth` | boolean | Require authentication for write operations (POST, PUT, DELETE) |
| `readAuth` | boolean | Require authentication for read operations (GET) |
| `customRoutes` | array | Additional custom routes to add |
| `middleware` | object | Custom middleware for specific routes |

## Benefits of This Refactoring

1. **DRY Principle** - Eliminated code duplication
2. **Consistency** - All routers follow the same pattern
3. **Maintainability** - Easy to understand and modify
4. **Extensibility** - Simple to add new routers
5. **Testability** - Easier to unit test routing logic
6. **Scalability** - Easy to handle complex routing scenarios

## Current Refactored Routers

- ✅ `category.routes.js` - Public reads, protected writes
- ✅ `gallery-article.routes.js` - Public reads, protected writes
- ✅ `place.routes.js` - Public reads, protected writes
- ✅ `people.routes.js` - Fully protected
- ✅ `image.routes.js` - With file upload custom routes
- ✅ `user.js` - With custom authentication routes

## Future Improvements

1. Create routers for `diary-article`, `gift`, and `special-moment`
2. Add route validation middleware
3. Add request logging middleware
4. Implement route versioning support
