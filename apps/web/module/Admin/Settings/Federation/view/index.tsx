"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Breeding_Season, T_Game_Fowl_Federation } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideBookText, LucideBuilding2, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteGameFowlFederation from "../../hooks/useDeleteGameFowlFederation";

const headers = ["Federations", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const federation = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [federationToDelete, setFederationToDelete] =
    useState<T_Game_Fowl_Federation | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteGameFowlFederation(handleRefetch);
  const federationTitle = (item: T_Game_Fowl_Federation) =>
    item.federationTitle || "Unknown";
  const federationMessage = (item: T_Game_Fowl_Federation) =>
    `Are you sure you want to delete "${item.federationTitle || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (federationToDelete?._id) {
      try {
        await mutate(federationToDelete._id);
        toast.success("Federation deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting federation");
      }
    } else {
      toast.error("Federation ID is missing or invalid");
    }
  };

  const openModal = (gameFowlFederation: T_Game_Fowl_Federation) => {
    setFederationToDelete(gameFowlFederation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFederationToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredFederation =
    federation?.gameFowlFederation?.filter(
      (gameFowlFederation: T_Game_Fowl_Federation) => {
        const titleMatch = gameFowlFederation.federationTitle
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return titleMatch;
      }
    ) || [];

  const totalPages = Math.ceil(filteredFederation.length / itemsPerPage);

  const renderRow = (row: T_Game_Fowl_Federation) => (
    <TableRow key={row._id}>
      <TableCell className="w-3/4">
        <Typography>{row.federationTitle}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
      <Button variant="outline">Show</Button>
        <Link href={`/admin/settings/federation/${row._id}/edit`}>
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
              <LucideBuilding2 />
              <Typography variant="h1" fontWeight="semiBold">
                View Federations
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of federations
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredFederation}
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
            <DeleteConfirmationModal<T_Game_Fowl_Federation>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={setFederationToDelete}
              itemTitle={federationTitle}
              message={federationMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
