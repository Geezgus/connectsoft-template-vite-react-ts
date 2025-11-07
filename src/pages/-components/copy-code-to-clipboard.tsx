import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CopyCodeToClipboard({ installation }: { installation: string[] }) {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect(() => {
		if (hasCopied) {
			const timer = setTimeout(() => setHasCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [hasCopied]);

	function copy() {
		navigator.clipboard.writeText(installation.join('\n'));
		setHasCopied(true);
	}

	return (
		<div className="bg-secondary rounded pl-4 pr-10 py-2 relative">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size="icon"
						variant="ghost"
						className="absolute top-1 right-1 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
						onClick={() => copy()}
					>
						{hasCopied ? <CheckIcon /> : <CopyIcon />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>{hasCopied ? 'Copied' : 'Copy to Clipboard'}</TooltipContent>
			</Tooltip>

			<div className="no-scrollbar overflow-x-auto">
				{installation.map((command) => (
					<pre>
						<code className="relative font-mono text-sm leading-none" data-language="bash">
							{command}
						</code>
					</pre>
				))}
			</div>
		</div>
	);
}
