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

const headers = ["Events Title", "Date","Time", "Action"];
const advertisementsData = [
  { id: 1, title: "High-Quality Broodcock", date: "June 27, 2021", time: "9:00 PM" },
  { id: 2, title: "Stag for Sale", date: "June 27, 2021", time: "9:00 PM" },
  { id: 3, title: "Broodhen Pair", date: "June 27, 2021", time: "9:00 PM" },
  { id: 4, title: "Gamefarm Supplies", date: "June 27, 2021", time: "9:00 PM" },
  { id: 5, title: "Training Services", date: "June 27, 2021", time: "9:00 PM" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of events
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View list of events</i>
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
                <TableCell className="w-1/6">{row.date}</TableCell>
                <TableCell className="w-1/5">{row.time}</TableCell>
                <TableCell className="w-1/6 flex gap-4">
                <Link href='/admin/web-contents/666839086f2250f4d1cefb84/events/edit'>
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
