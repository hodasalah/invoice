import { z } from 'zod';
import type { TFunction } from 'i18next';

export const signupSchema = (t: TFunction) =>
	z
		.object({
			email: z
				.string()
				.nonempty({ message: t('email_required') })
				.email({ message: t('email_invalid') }),

			password: z
				.string()
				.nonempty({ message: t('password_required') })
				.min(6, { message: t('password_min') })
				.regex(/[A-Z]/, { message: t('password_uppercase') }),

			confirmPassword: z
				.string()
				.nonempty({ message: t('confirm_password_required') }),

			firstName: z
				.string()
				.nonempty({ message: t('first_name_required') })
				.min(2, { message: t('first_name_min') }),

			lastName: z
				.string()
				.nonempty({ message: t('last_name_required') })
				.min(2, { message: t('last_name_min') }),

			phone: z
				.string()
				.nonempty({ message: t('phone_required') })
				.regex(/^(\+?\d{7,15})$/, { message: t('phone_invalid') }),

			position: z.string().optional(),
			companySize: z.string().optional(),

			businessName: z
				.string()
				.nonempty({ message: t('business_name_required') })
				.min(2, { message: t('business_name_min') }),

			address: z
				.string()
				.nonempty({ message: t('address_required') })
				.min(5, { message: t('address_min') }),

			city: z
				.string()
				.nonempty({ message: t('city_required') })
				.min(2, { message: t('city_min') }),

			vatNumber: z
				.string()
				.regex(/^[0-9]{10,15}$/, { message: t('vat_invalid') })
				.optional(),

			crNumber: z
				.string()
				.regex(/^[0-9]{5,15}$/, { message: t('cr_invalid') })
				.optional(),

			postalCode: z
				.string()
				.nonempty({ message: t('postal_code_required') }),

			secondaryCrNumber: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			if (data.password !== data.confirmPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t('password_mismatch'),
					path: ['confirmPassword'],
				});
			}
		});

export type SignupSchema = z.infer<ReturnType<typeof signupSchema>>;
