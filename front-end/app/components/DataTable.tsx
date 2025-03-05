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
  headers: { title: string; accessKey: keyof K }[];
  data: K[];
};

export const DataTable = <K extends object>({
  title,
  headers,
  data,
}: DataTableProps<K>) => (
  <Table>
    <TableCaption>{title}</TableCaption>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeader key={header.title}>{header.title}</TableHeader>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, i) => (
        <TableRow key={'row-' + i}>
          {headers.map((header, i) => (
            <TableCell key={'cell-' + i}>
              {String(row[header.accessKey])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
