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

const headers = ["Federation", "Action"];
const activitiesData = [
  { id: 1, title: "National Federation of Gamefowl Breeders, inc. (NFGB)" },
  { id: 2, title: "United Gamefowl Breeders Association, inc. (UGBA)" },
  { id: 3, title: "National Gamefowl Commission, (NGC)" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Federation
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl federation</i>
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
                <Link href='/admin/settings/federation/edit'>
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
