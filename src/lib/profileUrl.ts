export type ProfileService = 'linkedin' | 'github';

const PROFILE_HOSTS: Record<ProfileService, readonly string[]> = {
	linkedin: ['linkedin.com', 'www.linkedin.com'],
	github: ['github.com', 'www.github.com'],
};

const USERNAME_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const PROFILE_SLUG_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

// null = inválido; string vazia = campo opcional não informado.
export function normalizeProfileUrl(
	value: string,
	service: ProfileService,
): string | null {
	const raw = value.trim();
	if (!raw) return '';

	let slug: string;
	if (USERNAME_PATTERN.test(raw)) {
		slug = raw;
	} else {
		// Um domínio desconhecido nunca deve ser interpretado como nome de usuário.
		if (!/^(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com|github\.com)\//i.test(raw)) {
			return null;
		}
		try {
			const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
			if (
				!['http:', 'https:'].includes(url.protocol) ||
				!PROFILE_HOSTS[service].includes(url.hostname.toLowerCase()) ||
				url.username ||
				url.password ||
				url.port
			) {
				return null;
			}
			const segments = url.pathname.split('/').filter(Boolean);
			if (service === 'linkedin') {
				if (segments.length !== 2 || segments[0].toLowerCase() !== 'in') {
					return null;
				}
				slug = segments[1];
			} else {
				if (segments.length !== 1) return null;
				slug = segments[0];
			}
		} catch {
			return null;
		}
	}

	if (!PROFILE_SLUG_PATTERN.test(slug)) return null;
	return service === 'linkedin'
		? `https://www.linkedin.com/in/${slug}`
		: `https://github.com/${slug}`;
}
