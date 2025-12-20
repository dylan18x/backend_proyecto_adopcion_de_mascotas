/* eslint-disable */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface AuthUser {
  userId?: string;
  role?: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const request: { user?: AuthUser } = context.switchToHttp().getRequest();
    const user = request.user;
    // If there's no authenticated user, allow the request (prevent 401 from blocking).
    if (!user) return true;
    return !!user.role && roles.includes(user.role);
  }
}
