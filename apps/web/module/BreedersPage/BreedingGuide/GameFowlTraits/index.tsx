"use client";
import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { LucideBookOpen, LucideCircleUser } from "lucide-react";

interface TableData {
  type: string;
  category: string;
  traitSet: string;
}

const tableData: TableData[] = [
  { type: "Hatch", category: "Plumage", traitSet: "Red, Brown, Green, White, Black" },
  { type: "Hatch", category: "Physical Build", traitSet: "Robust, Muscular" },
  { type: "Hatch", category: "Temperament", traitSet: "Aggressive, Fearless" },
  { type: "Hatch", category: "Health and Hardiness", traitSet: "Robust, Resistant to common poultry diseases" },
  { type: "Hatch", category: "Breading Quality", traitSet: "Highly Valued" },
  { type: "Sweater", category: "Plumage", traitSet: "Red, White, Yellow, Gold" },
  { type: "Sweater", category: "Physical Build", traitSet: "Strong, Muscular" },
  { type: "Sweater", category: "Temperament", traitSet: "Aggressive, Fearless" },
  { type: "Sweater", category: "Health and Hardiness", traitSet: "Robust, Resistant to common poultry diseases" },
  { type: "Sweater", category: "Breading Quality", traitSet: "Highly Prized" },
];

const GameFowlTraits: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.traitSet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideBookOpen size={25} />
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            Breeding Guide
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideCircleUser size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Game Fowl Traits
            </Typography>
          </div>
          <div className="border-b py-2"></div>

          <div className="mt-4">
            <PaginatedTable
              data={filteredData}
              headers={["Game Fowl Type", "Game Fowl Traits Category", "Game Fowl Traits Set"]}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onItemsPerPageChange={setItemsPerPage}
              renderRow={(item: TableData) => (
                <TableRow key={`${item.type}-${item.category}`}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.traitSet}</TableCell>
                </TableRow>
              )}
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default GameFowlTraits;
