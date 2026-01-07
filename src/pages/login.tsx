import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { createFileRoute } from '@tanstack/react-router';
import { useId } from 'react';
import { IconMail } from '@tabler/icons-react';
import { RequestLinkButton } from '@/components/request-link-button';

const formSchema = z.object({
	email: z.email('Email is invalid.'),
});

export const Route = createFileRoute('/login')({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		defaultValues: {
			email: '',
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			toast.success('Login link was successfully sent to your email.');
		},
	});
	const formId = useId();

	return (
		<main className="min-h-svh px-4 flex flex-col gap-4 items-center justify-center">
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your email address to receive a login link.</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id={formId}
						onSubmit={async (e) => {
							e.preventDefault();
							await form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name="email">
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}></FieldLabel>
											<InputGroup>
												<InputGroupAddon>
													<IconMail />
												</InputGroupAddon>
												<InputGroupInput
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="Enter your email address"
													autoComplete="off"
												/>
											</InputGroup>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							</form.Field>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<form.Subscribe selector={(state) => [state.isSubmitting, state.isSubmitted]}>
						{([isSubmitting, isSubmitted]) => (
							<Field>
								<RequestLinkButton formId={formId} isSubmitting={isSubmitting} isSubmitted={isSubmitted} />
							</Field>
						)}
					</form.Subscribe>
				</CardFooter>
			</Card>
		</main>
	);
}
