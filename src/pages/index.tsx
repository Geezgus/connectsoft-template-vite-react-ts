import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { createFileRoute } from '@tanstack/react-router';
import { CopyCodeToClipboard } from './-components/copy-code-to-clipboard';
import { GithubForksBadge, GithubStargazersBadge, GithubWatchersBadge } from './-components/github-badge';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

type StackItem = {
	packages: string[];
	description: string;
	link: string;
	name: string;
};

const stack: StackItem[] = [
	{
		packages: [
			'@tanstack/react-router',
			'@tanstack/react-router-devtools',
			'@tanstack/router-plugin',
			'@tanstack/eslint-plugin-router',
		],
		description: 'Type-safe Routing for React and Solid applications',
		link: 'https://tanstack.com/router/latest',
		name: 'TanStack Router',
	},
	{
		packages: ['@tanstack/react-query', '@tanstack/eslint-plugin-query'],
		description: 'Powerful asynchronous state management, server-state utilities and data fetching',
		link: 'https://tanstack.com/query/latest',
		name: 'TanStack Query',
	},
];

function RouteComponent() {
	return (
		<main className="min-h-svh flex flex-col gap-4 items-center justify-center">
			<Card>
				<CardContent>
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<FolderCodeIcon />
							</EmptyMedia>
							<EmptyTitle>This project is empty</EmptyTitle>
							<EmptyDescription>
								You haven&apos;t created anything yet, so your project looks a bit boring. Let's fix this right away!
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<EmptyDescription className="w-full">
								This template uses the following stack:{' '}
								<Accordion className="w-full" type="single" collapsible>
									{stack.map(({ description, packages: installation, link, name }) => (
										<AccordionItem className="text-start" key={name} value={name}>
											<AccordionTrigger>{name}</AccordionTrigger>
											<AccordionContent>
												{description} &mdash;{' '}
												<a target="_blank" className="font-semibold" href={link}>
													Learn more
												</a>
											</AccordionContent>
											<AccordionContent>
												Installed packages:
												<CopyCodeToClipboard installation={installation} />
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</EmptyDescription>
						</EmptyContent>
						<Button variant="link" asChild className="text-muted-foreground" size="sm">
							<a href="https://github.com/geezgus/connectsoft-template-vite-react-ts">
								Learn About This Template <ArrowUpRightIcon />
							</a>
						</Button>
					</Empty>
				</CardContent>
				<CardFooter className="flex gap-2 justify-end">
					<GithubStargazersBadge owner="geezgus" repo="connectsoft-template-vite-react-ts" />
					<GithubWatchersBadge owner="geezgus" repo="connectsoft-template-vite-react-ts" />
					<GithubForksBadge owner="geezgus" repo="connectsoft-template-vite-react-ts" />
				</CardFooter>
			</Card>
		</main>
	);
}
