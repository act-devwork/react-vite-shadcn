import { LoadingSpinner } from "@/components/ui/loading-spinner";


export const LazyLoadSuspense = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <LoadingSpinner />
    </div>
  );
};
