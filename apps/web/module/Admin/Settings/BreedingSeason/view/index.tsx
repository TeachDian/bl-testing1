"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Breeding_Season } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideSunSnow } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteBreedingSeason from "../../hooks/useDeleteBreedingSeason";

const headers = ["Breeding Category", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const breederSettings = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breedingSeasonToDelete, setBreedingSeasonToDelete] =
    useState<T_Breeding_Season | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteBreedingSeason(handleRefetch);
  const breedingSeasonTitle = (item: T_Breeding_Season) =>
    item.breedingSeasonTitle || "Unknown";
  const breedingSeasonMessage = (item: T_Breeding_Season) =>
    `Are you sure you want to delete "${item.breedingSeasonTitle || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (breedingSeasonToDelete?._id) {
      try {
        await mutate(breedingSeasonToDelete._id);
        toast.success("Breeding category deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting Breeding category");
      }
    } else {
      toast.error("Breeding category ID is missing or invalid");
    }
  };

  const openModal = (breedingSeason: T_Breeding_Season) => {
    setBreedingSeasonToDelete(breedingSeason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBreedingSeasonToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredBreedingSeason =
    breederSettings?.breedingSeason?.filter(
      (breedingSeason: T_Breeding_Season) => {
        const titleMatch = breedingSeason.breedingSeasonTitle
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return titleMatch;
      }
    ) || [];

  const totalPages = Math.ceil(filteredBreedingSeason.length / itemsPerPage);

  const renderRow = (row: T_Breeding_Season) => (
    <TableRow key={row._id}>
      <TableCell className="w-3/4">
        <Typography>{row.breedingSeasonTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Button variant="outline">Show</Button>
        <Link href={`/admin/settings/breeding-season/${row._id}/edit`}>
          <Button>Edit</Button>
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
              <LucideSunSnow />
              <Typography variant="h1" fontWeight="semiBold">
                View Breeding Categories
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of breeding categories
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredBreedingSeason}
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
            <DeleteConfirmationModal<T_Breeding_Season>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={breedingSeasonToDelete}
              itemTitle={breedingSeasonTitle}
              message={breedingSeasonMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
