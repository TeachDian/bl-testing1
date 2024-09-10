"use client";
import { useState, useMemo } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Game_Fowl_Local_Association } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideBoxes, LucidePaintBucket } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteGameFowlLocalAssociation from "../../hooks/useDeleteGameFowlLocalAssociation";

const headers = ["Local Association", "Federation", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const gameFowlLocalAssociations = data?.items[0]?.gameFowlLocalAssociation || []; // Updated data fetching
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gfTypeToDelete, setGfTypeToDelete] = useState<T_Game_Fowl_Local_Association | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteGameFowlLocalAssociation(handleRefetch); // Updated hook
  const classMessage = (item: T_Game_Fowl_Local_Association) => `Are you sure you want to delete "${item.localAssociation || "this item"}"?`;

  const getFederationById = (id: string) => {
    return data?.items[0]?.gameFowlFederation?.find((type: { _id: string; }) => type._id === id)?.federationTitle || "Unknown";
  };

  const handleConfirmDelete = async () => {
    if (gfTypeToDelete?._id) {
      try {
        await mutate(gfTypeToDelete._id);
        toast.success("Type deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting type");
      }
    } else {
      toast.error("Type ID is missing or invalid");
    }
  };

  const openModal = (gameFowlType: T_Game_Fowl_Local_Association) => {
    setGfTypeToDelete(gameFowlType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGfTypeToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredTypes = useMemo(() => {
    return gameFowlLocalAssociations.filter((gameFowlLocalAssociation: T_Game_Fowl_Local_Association) => {
      const titleMatch = gameFowlLocalAssociation.localAssociation.toLowerCase().includes(searchTerm.toLowerCase());
      const classMatch = getFederationById(gameFowlLocalAssociation.federation).toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || classMatch;
    });
  }, [gameFowlLocalAssociations, searchTerm]);

  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);

  const renderRow = (row: T_Game_Fowl_Local_Association) => (
    <TableRow key={row._id}>
      <TableCell className="w-5/12">
        <Typography>{row.localAssociation}</Typography>
      </TableCell>
      <TableCell className="w-5/12">
        <Typography>{getFederationById(row.federation)}</Typography>
      </TableCell>
      <TableCell className="w-2/12 flex gap-4">
        <Button variant="outline" onClick={() => openModal(row)}>Hide</Button>
        <Link href={`/admin/settings/gf-type/${row._id}/edit`}>
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
              <LucideBoxes />
              <Typography variant="h1" fontWeight="semiBold">
                Local Association
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  List of Game Fowl Local Association
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredTypes}
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
            <DeleteConfirmationModal<T_Game_Fowl_Local_Association>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={gfTypeToDelete}
              itemTitle={getFederationById(gfTypeToDelete?.federation || "")}
              message={classMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;