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

const headers = [
  "Game Fowl Gender",
  "Game Fowl Status",
  "Age Range",
  "Description",
  "Action",
];
const activitiesData = [
  {
    id: 1,
    gender: "Female",
    status: "Pullet",
    ageRange: ">47 and <187",
    description: "A pullet is a young female game fowl",
  },
  {
    id: 2,
    gender: "Male",
    status: "Hen",
    ageRange: ">47 and <187",
    description: "A pullet is a young female game fowl",
  },
  {
    id: 3,
    gender: "Female",
    status: "Pullet",
    ageRange: ">47 and <187",
    description: "A pullet is a young female game fowl",
  },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Status
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl status</i>
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
                <TableCell className="w-1/4">{row.gender}</TableCell>
                <TableCell className="w-1/4">{row.status}</TableCell>
                <TableCell className="w-1/4">{row.ageRange}</TableCell>
                <TableCell className="w-1/4">{row.description}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="outline">Hide</Button>
                  <Link href="/admin/settings/gf-status/edit">
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
