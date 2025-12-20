/* eslint-disable */
import { Injectable, ExecutionContext } from '@nestjs/common';

const _passport = require('@nestjs/passport');
const BaseAuthGuard = _passport && _passport.AuthGuard ? _passport.AuthGuard('jwt') : class {};

@Injectable()
export class OptionalJwtAuthGuard extends (BaseAuthGuard as any) {
  handleRequest(...args: any[]): any {
    const user = args[1];
    return user ?? null;
  }
}
