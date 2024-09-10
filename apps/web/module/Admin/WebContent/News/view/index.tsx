"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_News } from "@repo/contract";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { LucideBookOpen, LucideBookText, LucideNewspaper, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import useDeleteNews from "@/module/Admin/hooks/useDeleteNews";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Date", "News Title","Author or Source", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<T_News | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteNews(handleRefetch);
  const eventTitle = (item: T_News) => item.newsTitle || "Unknown";
  const eventMessage = (item: T_News) =>
    `Are you sure you want to delete "${item.newsTitle || "this item"}" ?`;


  const formatDate = (date: string | Date | (string | Date)[]): string => {
    if (Array.isArray(date)) {
      return date
        .map((d) => {
          if (typeof d === "string") {
            try {
              return format(parseISO(d), "MMMM dd, yyyy");
            } catch (error) {
              console.error("Error parsing date string:", error);
              return "";
            }
          } else if (d instanceof Date) {
            return format(d, "MMMM dd, yyyy");
          }
          return "";
        })
        .filter((d) => d !== "") 
        .join(", "); 
    } else {
      if (typeof date === "string") {
        try {
          return format(parseISO(date), "MMMM dd, yyyy");
        } catch (error) {
          console.error("Error parsing date string:", error);
          return "";
        }
      } else if (date instanceof Date) {
        return format(date, "MMMM dd, yyyy");
      } else {
        return "";
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (newsToDelete?._id) {
      try {
        await mutate(newsToDelete._id);
        toast.success("News deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting news");
      }
    } else {
      toast.error("News ID is missing or invalid");
    }
  };
  const openModal = (event: T_News) => {
    setNewsToDelete(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewsToDelete(null);
  };
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredNews =
    webContents?.news?.filter((news: T_News) => {
      const titleMatch = news.newsTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const authorMatch = news.newsHost
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || authorMatch;
    }) || [];

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const renderRow = (row: T_News) => (
    <TableRow key={row._id}>
      <TableCell className="w-1/4">
        <Typography>{formatDate(row.newsDate)}</Typography>
      </TableCell>
      <TableCell className="w-1/3">
        <Typography>{row.newsTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/6">
        <Typography>
         {row.newsHost}
        </Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Link href={`/admin/web-contents/${row._id}/news/${row._id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="outline">Show</Button>
        <Button variant="destructive" onClick={() => openModal(row)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="full">
          <div className="flex flex-col w-full space-y-4">
            <div className="flex gap-2 items-center">
              <LucideNewspaper />
              <Typography variant="h1" fontWeight="semiBold">
                View News
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of news
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredNews}
                    headers={headers}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    totalPages={totalPages}
                    onSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    renderRow={renderRow}
                  />
                </div>
              </div>
            </div>
            <DeleteConfirmationModal<T_News>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={newsToDelete}
              itemTitle={eventTitle}
              message={eventMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
