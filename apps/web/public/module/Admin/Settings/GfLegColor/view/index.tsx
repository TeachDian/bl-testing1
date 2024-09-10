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

const headers = ["Game Fowl Leg Color", "Details", "Action"];
const activitiesData = [
  {
    id: 1,
    legColor: "Yellow",
    details: "Bright, vibrant white yellow legs, common in many breeds",
  },
  { id: 2, legColor: "White", details: "Pale white or ivory-colored legs" },
  {
    id: 3,
    legColor: "Green",
    details: "Greenish tint, ranging from light to dark green",
  },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Body Color
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl body color</i>
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
                <TableCell className="w-1/4">{row.legColor}</TableCell>
                <TableCell className="w-1/2">{row.details}</TableCell>
                <TableCell className="w-1/4 flex gap-4">
                  <Button variant="outline">hide</Button>
                  <Link href="/admin/settings/gf-leg-color/edit">
                    <Button>Edit</Button>
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
