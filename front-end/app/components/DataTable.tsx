import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type DataTableProps<K extends object> = {
  title: string;
  columns: {
    header: string;
    accessKey: keyof K;
    render?: (data: K) => ReactNode;
  }[];
  data: K[];
  noDataMessage: string;
  header: string;
};

export const DataTable = <K extends object>({
  title,
  columns,
  data,
  noDataMessage,
  header,
}: DataTableProps<K>) => {
  if (data.length === 0 && noDataMessage) {
    return <p className="my-4 text-gray-500">{noDataMessage}</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">{header}</h2>
      <Table className="rounded-md border">
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header} className="font-bold">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={'row-' + i}>
              {columns.map((col, i) => (
                <TableCell
                  key={'cell-' + i}
                  className="max-w-30 text-overflow: ellipsis truncate"
                >
                  {col?.render
                    ? col.render(d)
                    : (d[col.accessKey] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
