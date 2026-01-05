import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

type RequestLinkButtonProps = {
	formId: string;
	isSubmitting: boolean;
	isSubmitted: boolean;
	cooldownTimeSec?: number;
};

export function RequestLinkButton({ formId, isSubmitting, isSubmitted, cooldownTimeSec = 30 }: RequestLinkButtonProps) {
	const [cooldown, setCooldown] = useState(0);

	useEffect(() => {
		if (isSubmitted) {
			setCooldown(cooldownTimeSec);
		}
	}, [isSubmitted, cooldownTimeSec]);

	useEffect(() => {
		if (cooldown <= 0) return;

		const timer = setInterval(() => {
			setCooldown((prev) => Math.max(prev - 1, 0));
		}, 1000);

		return () => clearInterval(timer);
	}, [cooldown]);

	const label = useMemo(() => {
		if (isSubmitting) return 'Sending...';
		if (!isSubmitted) return 'Request link';
		if (cooldown > 0) return `Try again (${cooldown}s)`;
		return 'Try again';
	}, [isSubmitting, isSubmitted, cooldown]);

	const isDisabled = isSubmitting || cooldown > 0;

	return (
		<Button type="submit" form={formId} disabled={isDisabled}>
			{isSubmitting && <Spinner />}
			{label}
		</Button>
	);
}
