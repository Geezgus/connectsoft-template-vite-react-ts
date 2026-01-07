import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CopyCodeToClipboard } from '@/components/copy-code-to-clipboard';
import { GithubForksBadge, GithubStargazersBadge, GithubWatchersBadge } from '@/components/github-badge';

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
	{
		packages: ['@tanstack/react-form'],
		description: 'Headless UI for building performant and type-safe forms',
		link: 'https://tanstack.com/react-form/latest',
		name: 'TanStack Form',
	},
];

function RouteComponent() {
	return (
		<div className="min-h-svh flex flex-col">
			<header className="self-end p-4">
				<Button variant="link" render={<Link to="/login" />}>
					Login
				</Button>
			</header>
			<main className="px-4 flex-1 flex flex-col gap-4 items-center justify-center">
				<Card className="w-full sm:max-w-lg">
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
									<Accordion className="w-full">
										{stack.map(({ description, packages, link, name }) => (
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
													<CopyCodeToClipboard packages={packages} />
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>
								</EmptyDescription>
							</EmptyContent>
							<Button
								variant="link"
								render={<a href="https://github.com/geezgus/connectsoft-template-vite-react-ts" />}
								className="text-muted-foreground"
								size="sm"
							>
								Learn About This Template <ArrowUpRightIcon />
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
		</div>
	);
}
