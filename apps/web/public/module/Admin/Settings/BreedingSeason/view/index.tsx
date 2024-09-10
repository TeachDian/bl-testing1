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

const headers = ["Breeding Category", "Action"];
const activitiesData = [
  { id: 1, title: "Early Birds" },
  { id: 2, title: "Local" },
  { id: 3, title: "National" },
  { id: 4, title: "Late Born" },
  { id: 5, title: "Off Season" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Breeding Seasons
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of breeding seasons</i>
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
                <TableCell className="w-2/3">{row.title}</TableCell>
                <TableCell className="w-1/2 flex gap-4">
                <Link href='/admin/settings/breeding-season/edit'>
                <Button >Edit</Button>
                </Link>
                  <Button variant='outline'>Show</Button>
                  <Button variant='destructive'>Delete</Button>
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
