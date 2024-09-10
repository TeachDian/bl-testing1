"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_Videos } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideBookText, LucideClapperboard, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import Image from "next/image";
import videoIcon from "../../../../../public/12.png";
import { format, parseISO } from "date-fns";
import useDeleteVideos from "@/module/Admin/hooks/useDeleteVideos";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Video Icon", "Date", "Title of Videos", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videosToDelete, setVideosToDelete] = useState<T_Videos | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteVideos(handleRefetch);
  const videosTitle = (item: T_Videos) => item.videoTitle || "Unknown";
  const videosMessage = (item: T_Videos) =>
    `Are you sure you want to delete "${item.videoTitle || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (videosToDelete?._id) {
      try {
        await mutate(videosToDelete._id);
        toast.success("Video deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting video");
      }
    } else {
      toast.error("Video's ID is missing or invalid");
    }
  };

  const openModal = (videos: T_Videos) => {
    setVideosToDelete(videos);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideosToDelete(null);
  };

  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "";
    if (typeof date === "string") {
      return format(parseISO(date), "MMMM dd, yyyy");
    }
    if (date instanceof Date) {
      return format(date, "MM/dd/yyyy");
    }
    return "";
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredVideos =
    webContents?.videos?.filter((videos: T_Videos) => {
      const titleMatch = videos.videoTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch;
    }) || [];

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  const renderRow = (row: T_Videos) => (
    <TableRow key={row._id}>
      <TableCell className="w-2/5">
        {row.videoLink && row.videoLink.length > 0 ? (
          <Image
            width={150}
            height={150}
            src={videoIcon}
            alt={"Image description"}
            className="w-30 h-20 object-cover rounded-sm"
          />
        ) : (
          <div>
            <Typography>{row.videoLink}</Typography>
          </div>
        )}
      </TableCell>
      <TableCell className="w-1/4">
        <Typography>{formatDate(row.videoDate)}</Typography>
      </TableCell>
      <TableCell className="w-2/4">
        <Typography>{row.videoTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex items-center gap-4 pt-4 min-h-[100px]">
        <Link href={`/admin/web-contents/${row._id}/videos/${row._id}/edit`}>
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
              <LucideClapperboard/>
              <Typography variant="h1" fontWeight="semiBold">
                View Videos
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of videos
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredVideos}
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
            <DeleteConfirmationModal<T_Videos>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={videosToDelete}
              itemTitle={videosTitle}
              message={videosMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
