"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Game_Fowl_Leg_Color } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideBookText, LucidePaintBucket, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteGameFowlBodyColor from "../../hooks/useDeleteGameFowlBodyColor";

const headers = ["Game Fowl Leg Color", "Details", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const gameFowlLegColor = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bodyColorToDelete, setBodyColorToDelete] =
    useState<T_Game_Fowl_Leg_Color | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteGameFowlBodyColor(handleRefetch);
  const classTitle = (item: T_Game_Fowl_Leg_Color) => item.legColorTitle || "Unknown";
  const classMessage = (item: T_Game_Fowl_Leg_Color) =>
    `Are you sure you want to delete "${item.legColorTitle || "this item"}" ?`;

  const handleConfirmDelete = async () => {
    if (bodyColorToDelete?._id) {
      try {
        await mutate(bodyColorToDelete._id);
        toast.success("Class deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting class");
      }
    } else {
      toast.error("Class ID is missing or invalid");
    }
  };

  const openModal = (gameFowlLegColor: T_Game_Fowl_Leg_Color) => {
    setBodyColorToDelete(gameFowlLegColor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBodyColorToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredGender =
  gameFowlLegColor?.gameFowlLegColor?.filter((gameFowlLegColor: T_Game_Fowl_Leg_Color) => {
      const titleMatch = gameFowlLegColor.legColorTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
        const detailsMatch = gameFowlLegColor.legColorDetails
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || detailsMatch;
    }) || [];

  const totalPages = Math.ceil(filteredGender.length / itemsPerPage);

  const renderRow = (row: T_Game_Fowl_Leg_Color) => (
    <TableRow key={row._id}>
      <TableCell className="w-5/12">
        <Typography>{row.legColorTitle}</Typography>
      </TableCell>
      <TableCell className="w-5/12">
        <Typography>{row.legColorDetails}</Typography>
      </TableCell>
      <TableCell className="w-2/12 flex gap-4">
        <Button variant="outline">Hide</Button>
        <Link href={`/admin/settings/gf-leg-color/${row._id}/edit`}>
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
              <LucidePaintBucket />
              <Typography variant="h1" fontWeight="semiBold">
                List of Game Fowl Leg Color
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of game fowl leg color
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredGender}
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
            <DeleteConfirmationModal<T_Game_Fowl_Leg_Color>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={setBodyColorToDelete}
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
