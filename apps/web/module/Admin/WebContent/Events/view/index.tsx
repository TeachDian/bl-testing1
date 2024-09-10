"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_Events } from "@repo/contract";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { LucideBookOpen, LucideBookText, LucideCalendarClock, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import useDeleteEvent from "@/module/Admin/hooks/useDeleteEvents";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = [ "Date", "Events Title", "Description", "Action"];

const MAX_DESCRIPTION_LENGTH = 20;

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<T_Events | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteEvent(handleRefetch);
  const eventTitle = (item: T_Events) => item.eventTitle || "Unknown";
  const eventMessage = (item: T_Events) =>
    `Are you sure you want to delete "${item.eventTitle || "this item"}" ?`;

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

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete?._id) {
      try {
        await mutate(eventToDelete._id);
        toast.success("Event deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting event");
      }
    } else {
      toast.error("Event ID is missing or invalid");
    }
  };

  const openModal = (event: T_Events) => {
    setEventToDelete(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredEvents =
    webContents?.events?.filter((events: T_Events) => {
      const titleMatch = events.eventTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = events.eventDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch;
    }) || [];

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const renderRow = (row: T_Events) => (
    <TableRow key={row._id}>
      <TableCell className="w-1/4">
        <Typography>{formatDate(row.eventDates)}</Typography>
      </TableCell>
      <TableCell className="w-1/3">
        <Typography>{row.eventTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/6">
        <Typography>
          {truncateDescription(row.eventDescription, MAX_DESCRIPTION_LENGTH)}
        </Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Link href={`/admin/web-contents/${row._id}/events/${row._id}/edit`}>
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
              <LucideCalendarClock />
              <Typography variant="h1" fontWeight="semiBold">
                View Events
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of events
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredEvents}
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
            <DeleteConfirmationModal<T_Events>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={eventToDelete}
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
