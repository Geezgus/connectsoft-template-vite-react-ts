import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

function App() {
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
						<Button variant="link" asChild className="text-muted-foreground" size="sm">
							<a href="https://github.com/geezgus/connectsoft-template-vite-react-ts">
								Learn About This Template <ArrowUpRightIcon />
							</a>
						</Button>
					</Empty>
				</CardContent>
			</Card>
		</main>
	);
}

export default App;
