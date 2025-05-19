import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  OWNER(user, { can, cannot }) {
    can(['manage'], 'Client', '')

    can(['manage'], 'User')
  },
  ADMIN(user, { can, cannot }) {
    // Regra ok
    can(['manage'], 'User')
    // cannot(['update'], 'User')
    // can(['update'], 'User', {
    //   userId: { $eq: user.userId },
    // })

    cannot(['update'], 'User', ['role'], {
      userId: {
        $eq: user.userId,
      },
      role: {
        $ne: user.role,
      },
    })
  },
  MEMBER(user, { can, cannot }) {
    can(['update', 'list'], 'User')
    cannot(['update'], 'User')
    can(['update'], 'User', {
      userId: { $eq: user.userId },
    })
  },
}
