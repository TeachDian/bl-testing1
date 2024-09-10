"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_Billboards } from "@repo/contract";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { LucideClipboardCheck, LucideBookOpen } from "lucide-react";
import { TableRow, TableCell } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import useDeleteActivity from "@/module/Admin/hooks/useDeleteActivity";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Date Start", "Date End", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billboardToDelete, setBillboardToDelete] =
    useState<T_Billboards | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteActivity(handleRefetch);

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

  const handleConfirmDelete = async () => {
    if (billboardToDelete?._id) {
      try {
        await mutate(billboardToDelete._id);
        toast.success("Billboard deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting billboard");
      }
    } else {
      toast.error("Billboard ID is missing or invalid");
    }
  };

  const openModal = (billboard: T_Billboards) => {
    setBillboardToDelete(billboard);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBillboardToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredBillboards =
    webContents?.billboards?.filter((billboard: T_Billboards) => {
      const startDateMatch = billboard.startDate
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const endDateMatch = billboard.endDate
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return startDateMatch || endDateMatch;
    }) || [];

  const totalPages = Math.ceil(filteredBillboards.length / itemsPerPage);

  const renderRow = (row: T_Billboards) => (
    <TableRow key={row._id}>
      <TableCell className="w-5/12">
        <Typography>{formatDate(row.startDate)}</Typography>
      </TableCell>
      <TableCell className="w-5/12">
        <Typography>{formatDate(row.endDate)}</Typography>
      </TableCell>
      <TableCell className="w-2/12 flex gap-4">
        <Link
          href={`/admin/web-contents/${row._id}/advertisements/${row._id}/edit`}
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
                View Billboards
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View list of billboards
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredBillboards}
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
            <DeleteConfirmationModal<T_Billboards>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={billboardToDelete}
              itemTitle={(item) => formatDate(item.startDate)}
              message={(item) =>
                `Are you sure you want to delete this item scheduled from ${formatDate(item.startDate)} to ${formatDate(item.endDate)}?`
              }
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
