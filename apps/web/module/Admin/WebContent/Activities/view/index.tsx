"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_Activities, T_Update_Activities } from "@repo/contract";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { LucideBookOpen, LucideBookText, LucideClipboardCheck, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import useDeleteActivity from "@/module/Admin/hooks/useDeleteActivity";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Date", "Title of Activity", "Posted by", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activitiesToDelete, setActivitiesToDelete] =
    useState<T_Activities | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteActivity(handleRefetch);
  const activityTitle = (item: T_Activities) => item.activityTitle || "Unknown";
  const activityMessage = (item: T_Activities) =>
    `Are you sure you want to delete "${item.activityTitle || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (activitiesToDelete?._id) {
      try {
        await mutate(activitiesToDelete._id);
        toast.success("Activity deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting activity");
      }
    } else {
      toast.error("Activity ID is missing or invalid");
    }
  };

  const openModal = (videos: T_Activities) => {
    setActivitiesToDelete(videos);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActivitiesToDelete(null);
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

  const filteredActivities =
    webContents?.activities?.filter((activity: T_Activities) => {
      const titleMatch = activity.activityTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hostMatch = activity.activityHost
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || hostMatch;
    }) || [];

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const renderRow = (row: T_Activities) => (
    <TableRow key={row._id}>
      <TableCell className="w-1/4">
        <Typography>{formatDate(row.activityDate)}</Typography>
      </TableCell>
      <TableCell className="w-1/3">
        <Typography>{row.activityTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/6">
        <Typography>{row.activityHost}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Link
          href={`/admin/web-contents/${row._id}/activities/${row._id}/edit`}
        >
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
              <LucideClipboardCheck />
              <Typography variant="h1" fontWeight="semiBold">
                View Activities
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of activities
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredActivities}
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
            <DeleteConfirmationModal<T_Activities>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={activitiesToDelete}
              itemTitle={activityTitle}
              message={activityMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
