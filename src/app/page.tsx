import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Todos from "@/components/features/todo/todo";
import { getTodos } from "./api/todo/routes";

export default async function Home() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
	})
	
	return (
		<div className="font-[family-name:var(--font-geist-sans)] background">
			<main className="flex flex-col h-dvh w-dvw">
				<HydrationBoundary state={dehydrate(queryClient)}>
					<div className="flex flex-col justify-center items-center gap-8 h-screen md:flex-row p-2">
						<Todos />
					</div>
				</HydrationBoundary>
			</main>
		</div>
	);
}
