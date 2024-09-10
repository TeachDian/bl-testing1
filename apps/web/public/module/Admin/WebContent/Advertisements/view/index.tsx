import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/shadcn/ui/table";
import { Typography } from "@/common/components/ui/Typography";
import Link from "next/link";

const headers = ["Billboard Advertisement Title", "Location", "Action"];
const advertisementsData = [
  { id: 1, title: "High-Quality Broodcock", location: "Bacoor, Cavite" },
  { id: 2, title: "Stag for Sale", location: "Calamba, Laguna" },
  { id: 3, title: "Broodhen Pair", location: "Sta. Rosa, Laguna" },
  { id: 4, title: "Gamefarm Supplies", location: "Lipa, Batangas" },
  { id: 5, title: "Training Services", location: "Tanay, Rizal" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Billboard Advertisements
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View of billboard advertisements</i>
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
            {advertisementsData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="w-2/3">{row.title}</TableCell>
                <TableCell className="w-1/4">{row.location}</TableCell>
                <TableCell className="w-1/6 flex gap-4">
                <Link href='/admin/web-contents/666839086f2250f4d1cefb84/advertisements/edit'>
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
