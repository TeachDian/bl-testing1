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

const headers = ["Date", "Time","Title of Activity","Posted by", "Action"];
const activitiesData = [
  { id: 1,date: "June 28, 2024", time: "8:00 PM", title: "Activity title 1", postedBy: "Juan Dela Cruz" },
  { id: 2,date: "June 28, 2024", time: "8:00 PM", title: "Activity title 2", postedBy: "John Doe" },
  { id: 3,date: "June 28, 2024", time: "8:00 PM", title: "Activity title 3", postedBy: "Mary Jane Cruz" },
  { id: 4,date: "June 28, 2024", time: "8:00 PM", title: "Activity title 4", postedBy: "Felipe Romeo" },
  { id: 5,date: "June 28, 2024", time: "8:00 PM", title: "Activity title 5", postedBy: "Boni Express Events" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of Activities
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View lists of activities</i>
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
                <TableCell className="w-1/4">{row.date}</TableCell>
                <TableCell className="w-1/6">{row.time}</TableCell>
                <TableCell className="w-1/3">{row.title}</TableCell>
                <TableCell className="w-1/6">{row.postedBy}</TableCell>
                <TableCell className="w-1/4 flex gap-4">
                <Link href='/admin/web-contents/666839086f2250f4d1cefb84/activities/edit'>
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
