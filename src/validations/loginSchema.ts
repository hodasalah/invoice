import { z } from 'zod';
import type { TFunction } from 'i18next';


export const loginSchema = (t: TFunction) => z.object({
	email: z
		.string()
		.min(1, { message: t('email_required') })
		.email({ message: t('email_invalid') }),

	password: z.string().min(1, { message: t('password_required') }),
});
