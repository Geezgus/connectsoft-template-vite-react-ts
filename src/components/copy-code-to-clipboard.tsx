import { IconCheck, IconCopy } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CopyCodeToClipboard({ packages }: { packages: string[] }) {
	const [hasCopied, setHasCopied] = useState(false);
	const formattedPackages = useMemo(() => packages.join(' '), [packages]);

	useEffect(() => {
		if (hasCopied) {
			const timer = setTimeout(() => setHasCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [hasCopied]);

	function copy() {
		navigator.clipboard.writeText(formattedPackages);
		setHasCopied(true);
	}

	return (
		<div className="bg-secondary rounded pl-4 pr-10 py-2 relative">
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							size="icon"
							variant="ghost"
							className="absolute top-1 right-1 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
							onClick={() => copy()}
						/>
					}
				>
					{hasCopied ? <IconCheck /> : <IconCopy />}
				</TooltipTrigger>
				<TooltipContent>{hasCopied ? 'Copied' : 'Copy to Clipboard'}</TooltipContent>
			</Tooltip>

			<div className="no-scrollbar overflow-x-auto">
				<pre>
					<code className="relative font-mono text-sm leading-none" data-language="bash">
						{formattedPackages}
					</code>
				</pre>
			</div>
		</div>
	);
}
