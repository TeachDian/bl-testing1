import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/shadcn/ui/table";
import { Typography } from "@/common/components/ui/Typography";
import Link from "next/link";

const headers = ["Local Association", "Federation", "Action"];
const activitiesData = [
  { id: 1, association: "Name of local association" , federation: "Name of federation"},
  { id: 2, association: "Name of local association", federation: "Name of federation"},
  { id: 2, association: "Name of local association", federation: "Name of federation"},
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Local Association
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl local association</i>
      </p>
      <div className="mt-12">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="bg-gray-200">
                  <Typography fontWeight="semiBold">{header}</Typography>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {activitiesData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="w-2/5">{row.association}</TableCell>
                <TableCell className="w-2/5">{row.federation}</TableCell>
                <TableCell className="w-1/4 flex gap-4">
                <Button variant='outline'>Hide</Button>
                <Link href='/admin/settings/local-association/edit'>
                <Button >Edit</Button>
                </Link>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </WidthWrapper>
  );
};

export default View;
