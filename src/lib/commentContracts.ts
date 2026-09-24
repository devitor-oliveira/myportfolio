import { z } from 'astro/zod';
import { ExperienceValue } from '@/lib/siteContent';

const commentFields = {
	name: z.string().trim().min(1).max(80),
	comment: z.string().trim().min(1).max(500),
	jobtitle: z.string().trim().max(80),
	relationship: z.string().trim().max(80),
	experience: z.enum(ExperienceValue),
	github: z.string().trim().max(120),
	linkedin: z.string().trim().max(120),
};

// O horário é definido exclusivamente pelo servidor, nunca pelo formulário.
export const commentInputSchema = z.strictObject(commentFields);
export type CommentInput = z.infer<typeof commentInputSchema>;

// O Make pode acrescentar campos internos; somente estes são lidos e publicados.
export const makeCommentsSchema = z.object({
	comments: z.array(z.object({
		key: z.string(),
		data: z.object({
			status: z.string(),
			name: z.string(),
			comment: z.string(),
			postedon: z.string(),
			jobtitle: z.string().nullish(),
			relationship: z.string().nullish(),
			experience: z.string().nullish(),
			github: z.string().nullish(),
			linkedin: z.string().nullish(),
		}),
	})),
});

export const commentsResponseSchema = z.strictObject({
	total: z.number().int().nonnegative(),
	comments: z.array(z.strictObject({
		key: z.string(),
		data: z.strictObject({
			status: z.literal('approved'),
			name: z.string(),
			comment: z.string(),
			postedon: z.string(),
			jobtitle: z.string(),
			relationship: z.string(),
			experience: z.string(),
			github: z.string().optional(),
			linkedin: z.string().optional(),
		}),
	})),
});
export type CommentsApiResponse = z.infer<typeof commentsResponseSchema>;
export type Comment = CommentsApiResponse['comments'][number];
export type CommentData = Comment['data'];

export const commentCreatedSchema = z.strictObject({ ok: z.literal(true) });
