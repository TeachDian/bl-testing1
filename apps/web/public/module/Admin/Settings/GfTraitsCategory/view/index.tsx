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

const headers = ["Game Fowl Traits Category", "Action"];
const activitiesData = [
  { id: 1, traitsCategory: "Plumage" },
  { id: 2, traitsCategory: "Physical build" },
  { id: 3, traitsCategory: "Breeding quality" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Traits Category
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl traits</i>
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
                <TableCell className="w-2/3">{row.traitsCategory}</TableCell>
                <TableCell className="flex gap-4">
                <Button variant='outline'>Hide</Button>
                <Link href='/admin/settings/gf-traits-category/edit'>
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
