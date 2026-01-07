import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './route-tree.gen';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';

// Create a new router instance
const router = createRouter({ routeTree });

// Create a query client
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="@cs:ui-theme">
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<Toaster richColors />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
