import { ADMIN_ROUTES } from '@/config/routes/superAdminRoutes';
import { USER_ROUTES } from '@/config/routes/userRoutes';

import { Role } from '@/types/auth/role';

export const navigateToRoleDashboard = ({ role }: { role: Role }) => {
	switch (role) {
		case Role.SUPER_ADMIN: {
			return ADMIN_ROUTES.DASHBOARD;
		}
		case Role.USER: {
			return USER_ROUTES.DASHBOARD;
		}
		default: {
			return '';
		}
	}
};
