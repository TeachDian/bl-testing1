"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_Sliders } from "@repo/contract";
import Link from "next/link";
import { LucideBookOpen, LucideEye, LucideImagePlus } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import Image from "next/image";
import useDeleteSlider from "@/module/Admin/hooks/useDeleteSlider";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Picture", "Slider Title", "Action"];

const View = () => {
  const { data, isPending, refetch } = useGetWebContents();
  const webContents = data?.items[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPicturesModalOpen, setIsPicturesModalOpen] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState<T_Sliders | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleRefetch = () => {
    refetch();
  };

  const { mutate } = useDeleteSlider(handleRefetch);
  const sliderTitle = (item: T_Sliders) => item.sliderDescription || "Unknown";
  const sliderMessage = (item: T_Sliders) =>
    `Are you sure you want to delete "${item.sliderDescription || "this item"}" ?`;

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleConfirmDelete = async () => {
    if (sliderToDelete?._id) {
      try {
        await mutate(sliderToDelete._id);
        toast.success("Slider deleted successfully");
        closeDeleteModal();
      } catch (error) {
        toast.error("Error deleting slider");
      }
    } else {
      toast.error("Slider ID is missing or invalid");
    }
  };

  const openDeleteModal = (event: T_Sliders) => {
    setSliderToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSliderToDelete(null);
  };

  const openPicturesModal = (images: string[]) => {
    setSelectedImages(images);
    setIsPicturesModalOpen(true);
  };

  const closePicturesModal = () => {
    setIsPicturesModalOpen(false);
    setSelectedImages([]);
  };

  const filteredSliders =
    webContents?.sliders?.filter((sliders: T_Sliders) => {
      const titleMatch = sliders.sliderDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch;
    }) || [];

  const totalPages = Math.ceil(filteredSliders.length / itemsPerPage);

  const renderRow = (row: T_Sliders) => (
    <TableRow key={row._id}>
      <TableCell className="w-2/5">
        {row.photos && row.photos.length > 0 ? (
          row.photos.length === 1 ? (
            <Image
              width={150}
              height={150}
              src={`/assets/${row.photos[0]?.key}`}
              alt={row.photos[0]?.description || "Image description"}
              className="w-30 h-20 object-cover rounded-sm"
            />
          ) : (
            <div className="flex items-center">
              <Image
                width={150}
                height={150}
                src={`/assets/${row.photos[0]?.key}`}
                alt={row.photos[0]?.description || "Image description"}
                className="w-30 h-20 object-cover rounded-sm"
              />
              <Button
                variant="ghost"
                onClick={() =>
                  openPicturesModal(
                    row.photos?.map((photo) => `/assets/${photo?.key}`) || []
                  )
                }
              >
                <LucideEye size={20} />
                <Typography className="text-gray-700 text-sm ml-2">
                  Show more...
                </Typography>
              </Button>
            </div>
          )
        ) : (
          <Typography className="text-gray-700">No thumbnail</Typography>
        )}
      </TableCell>
      <TableCell className="w-2/4">
        <Typography>{row.sliderDescription}</Typography>
      </TableCell>
      <TableCell className="w-1/4 flex items-center gap-4 pt-4 min-h-[100px]">
        <Link href={`/admin/web-contents/${row._id}/sliders/${row._id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="outline">Show</Button>
        <Button variant="destructive" onClick={() => openDeleteModal(row)}>
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
              <LucideImagePlus />
              <Typography variant="h1" fontWeight="semiBold">
                View Sliders
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  View lists of sliders
                </Typography>
              </div>

              <div className="border-b py-2"></div>
              <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
                <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                  <PaginatedTable
                    data={filteredSliders}
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
            <DeleteConfirmationModal<T_Sliders>
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleConfirmDelete}
              item={sliderToDelete}
              itemTitle={sliderTitle}
              message={sliderMessage}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default View;
