"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Typography } from "@/common/components/ui/Typography";
import Link from "next/link";
import { LucideBookText, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { Button } from "@/common/components/shadcn/ui/button";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/module/Admin/component/DeleteModal";

const headers = ["Photo", "Microchip No.", "Wing Band No.", "Cross / Breed", "Age", "Origin Farm", "Status", "Action"];

interface Fowl {
  id: string;
  photoUrl: string;
  microchipNo: string;
  wingBandNo: string;
  crossBreed: string;
  age: string;
  originFarm: string;
  status: string;
}

const View = () => {
  const dummyData: Fowl[] = [
    {
      id: "1",
      photoUrl: "/path/to/photo1.jpg",
      microchipNo: "950823",
      wingBandNo: "23568",
      crossBreed: "1/2 Sweater + 1/2 Hatch",
      age: "1.50",
      originFarm: "Reyes Breeder Farm",
      status: "Brood Cock",
    },
    {
      id: "2",
      photoUrl: "/path/to/photo2.jpg",
      microchipNo: "756231",
      wingBandNo: "256987",
      crossBreed: "1/2 Round Head + 1/4 Lemon + 1/4 Kelso",
      age: "1.67",
      originFarm: "Sandoval Breeder Farm",
      status: "Brood Cock",
    },
    {
      id: "3",
      photoUrl: "/path/to/photo3.jpg",
      microchipNo: "789561",
      wingBandNo: "23047",
      crossBreed: "1/4 Albany + 1/4 Sid Taylor + 1/4 Madras + 1/4 Luk Thai",
      age: "2.00",
      originFarm: "Dela Pena Breeder Farm",
      status: "Brood Cock",
    },
    {
      id: "4",
      photoUrl: "/path/to/photo4.jpg",
      microchipNo: "789564",
      wingBandNo: "21234",
      crossBreed: "3/4 O-Shamo + 1/4 Kinpa",
      age: "2.30",
      originFarm: "Mondes Breeder Farm",
      status: "Black Cock",
    },
    {
      id: "5",
      photoUrl: "/path/to/photo4.jpg",
      microchipNo: "789564",
      wingBandNo: "21234",
      crossBreed: "3/4 O-Shamo + 1/4 Kinpa",
      age: "2.30",
      originFarm: "Mondes Breeder Farm",
      status: "Black Cock q",
    },
    {
      id: "6",
      photoUrl: "/path/to/photo4.jpg",
      microchipNo: "789564",
      wingBandNo: "21234",
      crossBreed: "3/4 O-Shamo + 1/4 Kinpa",
      age: "2.30",
      originFarm: "Mondes Breeder Farm",
      status: "Black Cock 3",
    },
    {
      id: "7",
      photoUrl: "/path/to/photo4.jpg",
      microchipNo: "789564",
      wingBandNo: "21234",
      crossBreed: "3/4 O-Shamo + 1/4 Kinpa",
      age: "2.30",
      originFarm: "Mondes Breeder Farm",
      status: "Black Cock 5",
    },
  ];

  const [fowls, setFowls] = useState<Fowl[]>(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fowlToDelete, setFowlToDelete] = useState<Fowl | null>(null);

  const fowlTitle = (item: Fowl) => item.crossBreed || "Unknown";
  const fowlMessage = (item: Fowl) =>
    `Are you sure you want to delete "${item.crossBreed || "this fowl"}"?`;

  const handleConfirmDelete = async () => {
    if (fowlToDelete) {
      try {
        setFowls(fowls.filter(fowl => fowl.id !== fowlToDelete.id));
        toast.success("Fowl deleted successfully");
        closeModal();
      } catch (error) {
        toast.error("Error deleting fowl");
      }
    }
  };

  const openModal = (fowl: Fowl) => {
    setFowlToDelete(fowl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFowlToDelete(null);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const filteredFowls = fowls.filter((fowl) =>
    fowl.microchipNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fowl.wingBandNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fowl.crossBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fowl.originFarm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFowls = filteredFowls.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredFowls.length / itemsPerPage);

  const renderRow = (row: Fowl) => (
    <TableRow key={row.id} className="h-20">
      <TableCell>
        <img src={row.photoUrl} alt="Fowl Photo" className="h-20 w-20 object-cover" />
      </TableCell>
      <TableCell>{row.microchipNo}</TableCell>
      <TableCell>{row.wingBandNo}</TableCell>
      <TableCell>{row.crossBreed}</TableCell>
      <TableCell>{row.age}</TableCell>
      <TableCell>{row.originFarm}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell className="flex justify-center items-center">
        <div className="flex mt-5 space-x-2">
          <Button variant="default">View Details</Button>
          <Button variant="outline">Market Place</Button>
        </div>
      </TableCell>
    </TableRow>
  );
  

  return (
    <>
      <WidthWrapper width="full">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex gap-2 items-center">
            <LucideSquareGantt />
            <Typography variant="h1" fontWeight="semiBold">
              List of Male Game Fowls
            </Typography>
          </div>

          <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
            <div className="flex gap-2 items-center">
              <LucideBookText />
              <Typography variant="h3" fontWeight="semiBold">
                View lists of fowls
              </Typography>
            </div>

            <div className="border-b py-2"></div>
            <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
              <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
                <PaginatedTable
                  data={paginatedFowls}
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
          <DeleteConfirmationModal<Fowl>
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirmDelete}
            item={fowlToDelete}
            itemTitle={fowlTitle}
            message={fowlMessage}
          />
        </div>
      </WidthWrapper>
    </>
  );
};

export default View;
