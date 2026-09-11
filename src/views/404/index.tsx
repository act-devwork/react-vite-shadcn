import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-xs text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/">
        <Button className="mt-6">
          Go to home
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
