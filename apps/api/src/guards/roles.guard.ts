import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '~/decorators/roles.decorator'
import { Role } from '~/types/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!requiredRoles) {
			return true
		}

		const { user } = context.switchToHttp().getRequest()
		const canAccess = requiredRoles.some(role => user.roles.includes(role))

		if (canAccess) {
			return true
		} else {
			throw new UnauthorizedException()
		}
	}
}
