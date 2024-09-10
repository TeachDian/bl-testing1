"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import {  T_Game_Fowl_Skills_Category } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideBookText, LucideLibrarySquare, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteGameFowlBodyColor from "../../hooks/useDeleteGameFowlBodyColor";

const headers = ["Game Fowl Skills Category", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const gameFowlSkillsCategory = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bodyColorToDelete, setBodyColorToDelete] =
    useState<T_Game_Fowl_Skills_Category | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteGameFowlBodyColor(handleRefetch);
  const classTitle = (item: T_Game_Fowl_Skills_Category) =>
    item.skillsCategory || "Unknown";
  const classMessage = (item: T_Game_Fowl_Skills_Category) =>
    `Are you sure you want to delete "${item.skillsCategory || "this item"}" ?`;

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

  const openModal = (gameFowlSkillsCategory: T_Game_Fowl_Skills_Category) => {
    setBodyColorToDelete(gameFowlSkillsCategory);
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

  const filteredSkillsCategory =
    gameFowlSkillsCategory?.gameFowlSkillsCategory?.filter(
      (gameFowlLegColor: T_Game_Fowl_Skills_Category) => {
        const titleMatch = gameFowlLegColor.skillsCategory
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return titleMatch;
      }
    ) || [];

  const totalPages = Math.ceil(filteredSkillsCategory.length / itemsPerPage);

  const renderRow = (row: T_Game_Fowl_Skills_Category) => (
    <TableRow key={row._id}>
     
      <TableCell className="w-3/4">
        <Typography>{row.skillsCategory}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Button variant="outline">Hide</Button>
        <Link href={`/admin/settings/gf-skills-category/${row._id}/edit`}>
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
              <LucideLibrarySquare />
              <Typography variant="h1" fontWeight="semiBold">
                List of Game Fowl Skills Category
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of game fowl skills category
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredSkillsCategory}
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
            <DeleteConfirmationModal<T_Game_Fowl_Skills_Category>
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
