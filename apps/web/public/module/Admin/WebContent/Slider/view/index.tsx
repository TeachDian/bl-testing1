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

const headers = ["Picture", "Slider Title", "Action"];
const advertisementsData = [
  { id: 1, picture: "Slider icon here", title: "Slider title"},
  { id: 2, picture: "Slider icon here", title: "Slider title"},
  { id: 3, picture: "Slider icon here", title: "Slider title"},
  { id: 4, picture: "Slider icon here", title: "Slider title"},
  { id: 5, picture: "Slider icon here", title: "Slider title"},
];

const View = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        List of sliders
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>View list of sliders</i>
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
                <TableCell className=" items-center w-2/4 h-[50px] ">
                <div className="h-[80px] w-[150px] text-gray-600 bg-gray-300 rounded-md flex items-center justify-center">
                  {row.picture}
                </div>
                </TableCell>
                <TableCell className="w-1/4">{row.title}</TableCell>
                <TableCell className=" flex items-center gap-4 mt-6">
                <Link href='/admin/web-contents/666839086f2250f4d1cefb84/sliders/edit'>
                <Button>Edit</Button>
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
