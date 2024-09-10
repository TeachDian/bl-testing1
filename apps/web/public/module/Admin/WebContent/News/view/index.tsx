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

const headers = ["Date", "News Title","Author or Source", "Action"];
const advertisementsData = [
  { id: 1, date: "June 27, 2021", title: "News title", authorOrSource: "Author or source" },
  { id: 2, date: "June 27, 2021", title: "News title", authorOrSource: "Author or source" },
  { id: 3, date: "June 27, 2021", title: "News title", authorOrSource: "Author or source" },
  { id: 4, date: "June 27, 2021", title: "News title", authorOrSource: "Author or source" },
  { id: 5, date: "June 27, 2021", title: "News title", authorOrSource: "Author or source" },
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of news
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View list of news</i>
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
                <TableCell className="w-2/5">{row.date}</TableCell>
                <TableCell className="w-1/6">{row.title}</TableCell>
                <TableCell className="w-1/5">{row.authorOrSource}</TableCell>
                <TableCell className="w-1/6 flex gap-4">
                <Link href='/admin/web-contents/666839086f2250f4d1cefb84/news/edit'>
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
