/**
 * Role Guard Middleware
 * 
 * Enforces role-based access control (RBAC).
 * Spec 2.2: Roles are immutable and distinct.
 */

import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@nexttern/shared';

/**
 * Require specific role(s) to access the route
 */
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    if (!req.user.role) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'User has no assigned role',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Access requires one of the following roles: ${allowedRoles.join(', ')}`,
      });
    }

    next();
  };
};

/**
 * Require Student role
 */
export const requireStudent = requireRole([UserRole.STUDENT]);

/**
 * Require Recruiter role
 */
export const requireRecruiter = requireRole([UserRole.RECRUITER]);

/**
 * Require Onboarding completion
 * Ensures user has completed profile setup before accessing app features.
 */
export const requireOnboardingComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // This would typically check a DB flag or claim in the token
  // For now, we'll assume the token claim is sufficient if we add it later
  // or fetch from DB if critical.
  
  // Placeholder for logic:
  // if (!req.user.onboardingComplete) ...
  
  next();
};
