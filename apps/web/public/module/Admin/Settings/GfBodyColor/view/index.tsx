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

const headers = ["Game Fowl Feather Color", "Details", "Action"];
const activitiesData = [
  { id: 1, bodyColor: "Brown red", details: "Red neck and breast with black body and tail feathers" },
  { id: 2, bodyColor: "Silver duck wing", details: "Pure white feathers through out the body" },
  { id: 3, bodyColor: "Red Pile", details: "Yellowish or white brown feathers, resembling a lion's coat" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Feather Color
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl feather color</i>
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
                <TableCell className="w-1/4">{row.bodyColor}</TableCell>
                <TableCell className="w-1/2">{row.details}</TableCell>
                <TableCell className="w-1/4 flex gap-4">
                <Link href='/admin/settings/gf-body-color/edit'>
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
