"use client";
import { useState, useMemo } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import { T_Game_Fowl_Traits } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucidePaintBucket } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useDeleteGameFowlTraits from "../../hooks/useDeleteGameFowlTraits";

const headers = [
  "Game Fowl Type",
  "Game Fowl Traits Category",
  "Game Fowl Traits Set",
  "Action",
];

const View = () => {
  const { data, isPending, refetch } = useGetBreederSettings();
  const gameFowlTraits = data?.items[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gfTraitsToDelete, setgfTraitsToDelete] =
    useState<T_Game_Fowl_Traits | null>(null);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteGameFowlTraits(handleRefetch);
  const classMessage = (item: T_Game_Fowl_Traits) =>
    `Are you sure you want to delete "${item.gameFowlType || "this item"}`;

  const getTypeNameById = (id: string) => {
    return (
      data?.items[0]?.gameFowlType?.find(
        (type: { _id: string }) => type._id === id
      )?.gameFowlType || "Unknown"
    );
  };

  const getCategoryNameById = (id: string) => {
    return (
      data?.items[0]?.gameFowlTraitsCategory?.find(
        (category: { _id: string }) => category._id === id
      )?.traitsCategory || "Unknown"
    );
  };

  const handleConfirmDelete = async () => {
    if (gfTraitsToDelete?._id) {
      try {
        await mutate(gfTraitsToDelete._id);
        toast.success("Trait deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting traits");
      }
    } else {
      toast.error("Traits ID is missing or invalid");
    }
  };

  const openModal = (gameFowlTraits: T_Game_Fowl_Traits) => {
    setgfTraitsToDelete(gameFowlTraits);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setgfTraitsToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredTraits = useMemo(() => {
    return (
      gameFowlTraits?.gameFowlTraits?.filter(
        (gameFowlTraits: T_Game_Fowl_Traits) => {
          const titleMatch = getTypeNameById(gameFowlTraits.gameFowlType)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const detailsMatch = getCategoryNameById(
            gameFowlTraits.gameFowlTraitsCategory
          )
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return titleMatch || detailsMatch;
        }
      ) || []
    );
  }, [gameFowlTraits, searchTerm]);

  const totalPages = Math.ceil(filteredTraits.length / itemsPerPage);

  const renderRow = (row: T_Game_Fowl_Traits) => (
    <TableRow key={row._id}>
      <TableCell>
        <Typography>{getTypeNameById(row.gameFowlType)}</Typography>
      </TableCell>
      <TableCell className="2/4">
        <Typography>
          {getCategoryNameById(row.gameFowlTraitsCategory)}
        </Typography>
      </TableCell>
      <TableCell className="2/4">
        <Typography>{row.gameFowlTraitsSet.replace(/[""]/g, "")}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex gap-4">
        <Button variant="outline" onClick={() => openModal(row)}>
          Hide
        </Button>
        <Link href={`/admin/settings/gf-traits/${row._id}/edit`}>
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
                Game Fowl Traits
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  List of Game Fowl Traits
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredTraits}
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
            <DeleteConfirmationModal<T_Game_Fowl_Traits>
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={handleConfirmDelete}
              item={gfTraitsToDelete}
              itemTitle={getTypeNameById(gfTraitsToDelete?.gameFowlType || "")}
              message={classMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
