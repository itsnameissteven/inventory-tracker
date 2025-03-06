import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router';

export const TableActionButton = ({ itemId }: { itemId: string }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate('/item/' + itemId)}>
          Edit item
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View variations</DropdownMenuItem>
        <DropdownMenuItem>View attributes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
