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

const headers = ["Game Fowl Type", "Game Fowl Skills Category", "Game Fowl Skills Set", "Action"];
const activitiesData = [
  { id: 1, skillsType: "Hatch" , skillsCategory: "Fighting Ability", skillsSet: "High Stamina"},
  { id: 2, skillsType: "Sweater", skillsCategory: "Precise, effective", skillsSet: "Fast" },
  { id: 2, skillsType: "Sweater", skillsCategory: "Power", skillsSet: "Powerful Strike" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Game Fowl Skill
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of game fowl skills</i>
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
                <TableCell className="w-1/4">{row.skillsType}</TableCell>
                <TableCell className="w-1/4">{row.skillsCategory}</TableCell>
                <TableCell className="w-1/4">{row.skillsSet}</TableCell>
                <TableCell className="flex gap-4">
                <Button variant='outline'>Hide</Button>
                <Link href='/admin/settings/gf-skills/edit'>
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
