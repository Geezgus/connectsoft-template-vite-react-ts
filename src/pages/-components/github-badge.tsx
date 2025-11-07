import { EyeIcon, GitForkIcon, StarIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import type { ComponentProps, ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/utils';

type GithubRepositoryData = {
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
};

type GithubBadgeProps = {
	owner: string;
	repo: string;
	metric: keyof GithubRepositoryData;
};

const METRICS = {
	stargazers_count: { label: 'Stargazers', Icon: StarIcon },
	watchers_count: { label: 'Watchers', Icon: EyeIcon },
	forks_count: { label: 'Forks', Icon: GitForkIcon },
} satisfies Record<keyof GithubRepositoryData, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }>;

function useGithubRepoQuery(owner: string, repo: string) {
	const { isPending, error, data } = useQuery<GithubRepositoryData>({
		queryKey: ['github-repo', owner, repo],
		queryFn: async () => {
			const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return await response.json();
		},
	});
	return { data, error, isPending };
}

function GithubBadge({ owner, repo, metric, ...props }: GithubBadgeProps & ComponentProps<typeof Badge>) {
	const { isPending, error, data } = useGithubRepoQuery(owner, repo);
	const { label, Icon } = METRICS[metric];
	if (isPending) return <Skeleton className="w-16 h-5" />;
	if (error || !data) {
		return (
			<Badge className="h-5 min-w-5 text-destructive" variant="outline" aria-label={label}>
				<Icon aria-hidden="true" />
				Error
			</Badge>
		);
	}
	return (
		<Badge className={cn('h-5 min-w-5', props.className)} variant={props.variant ?? 'outline'}>
			<Icon />
			{data[metric]} {label}
		</Badge>
	);
}

export function GithubStargazersBadge(props: Omit<ComponentProps<typeof GithubBadge>, 'metric'>) {
	return <GithubBadge className="text-yellow-600" {...props} metric="stargazers_count" />;
}

export function GithubWatchersBadge(props: Omit<ComponentProps<typeof GithubBadge>, 'metric'>) {
	return <GithubBadge className="text-zinc-600" {...props} metric="watchers_count" />;
}

export function GithubForksBadge(props: Omit<ComponentProps<typeof GithubBadge>, 'metric'>) {
	return <GithubBadge className="text-blue-600" {...props} metric="forks_count" />;
}
