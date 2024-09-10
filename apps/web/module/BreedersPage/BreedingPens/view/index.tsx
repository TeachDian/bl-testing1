"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Breeding_Pens } from "@repo/contract";
import Link from "next/link";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import { LucideBookText, LucideSquareGantt } from "lucide-react";
import useGetBreederModule from "@/common/hooks/Breeder-Module/useGetBreederModule";
import useDeleteBreedingPen from "../../hooks/useDeleteBreedingPen";
import { format, parseISO } from "date-fns";

const headers = [
  "Breeding Date",
  "Breeding Category",
  "Breeding Pen",
  "Action",
];

const View = () => {
  const { data, isPending, refetch } = useGetBreederModule();
  const breedingPens = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breedingPensToDelete, setBreedingPensToDelete] =
    useState<T_Breeding_Pens | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteBreedingPen(handleRefetch);
  const classTitle = (item: T_Breeding_Pens) => item.breedingPen || "Unknown";
  const classMessage = (item: T_Breeding_Pens) =>
    `Are you sure you want to delete "${item._id || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (breedingPensToDelete?._id) {
      try {
        await mutate(breedingPensToDelete._id);
        toast.success("Class deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting class");
      }
    } else {
      toast.error("Class ID is missing or invalid");
    }
  };

  const openModal = (breedingPens: T_Breeding_Pens) => {
    setBreedingPensToDelete(breedingPens);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBreedingPensToDelete(null);
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

  const filteredBreedingPens =
    breedingPens?.breedingPens?.filter(
      (breegingPensModule: T_Breeding_Pens) => {
        const titleMatch = breegingPensModule.breedingPen
          ? breegingPensModule.breedingPen.toLowerCase().includes(searchTerm.toLowerCase())
          : false;

        const hostMatch = typeof breegingPensModule.breedingSeason === "string"
          ? breegingPensModule.breedingSeason.toLowerCase().includes(searchTerm.toLowerCase())
          : false;

        return titleMatch || hostMatch;
      }
    ) || [];

  const totalPages = Math.ceil(filteredBreedingPens.length / itemsPerPage);

  const renderRow = (row: T_Breeding_Pens) => (
    <TableRow key={row._id}>
      <TableCell>
        <Typography>{formatDate(row.breedingDate)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>
          {typeof row.breedingSeason === "object" &&
          row.breedingSeason !== null &&
          "breedingSeasonTitle" in row.breedingSeason
            ? (row.breedingSeason as any).breedingSeasonTitle
            : "Unknown"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>{row.breedingPen}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Button variant="destructive" onClick={() => openModal(row)}>
          Delete
        </Button>
        <Link href={`/breeders/breeding-pens/${row._id}/view`}>
          <Button>View</Button>
        </Link>
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
              <LucideSquareGantt />
              <Typography variant="h1" fontWeight="semiBold">
                Breeding Pens
              </Typography>
            </div>
            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookText />
                <Typography variant="h3" fontWeight="semiBold">
                  List of Game Fowl Breedings
                </Typography>
              </div>
              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredBreedingPens}
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
            <DeleteConfirmationModal<T_Breeding_Pens>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={setBreedingPensToDelete}
              itemTitle={classTitle}
              message={classMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
