"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Typography } from "@/common/components/ui/Typography";
import { LucideClipboardCheck, LucideBookOpen } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";

const headers = ["Game Fowl Type", "Game Fowl Skills Category", "Game Fowl Skills Set"];

interface GameFowlSkill {
  type: string;
  category: string;
  skillSet: string;
}

const GameFowlSkills: GameFowlSkill[] = [
  { type: "Hatch", category: "Fighting Ability", skillSet: "Aggressive, Tenacious" },
  { type: "Hatch", category: "Power", skillSet: "Powerful Strikes" },
  { type: "Hatch", category: "Intelligence", skillSet: "High Level" },
  { type: "Hatch", category: "Cutting Ability", skillSet: "High" },
  { type: "Hatch", category: "Endurance", skillSet: "Great Stamina" },
  { type: "Hatch", category: "Game Sense", skillSet: "High Level" },
  { type: "Sweater", category: "Fighting Ability", skillSet: "Relentless, Aggressive" },
  { type: "Sweater", category: "Stamina", skillSet: "High Stamina" },
  { type: "Sweater", category: "Speed", skillSet: "Fast" },
  { type: "Sweater", category: "Power", skillSet: "Powerful Strikes" },
  { type: "Sweater", category: "Intelligence", skillSet: "High Level" },
  { type: "Sweater", category: "Cutting Ability", skillSet: "Precise, Effective" },
];

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = GameFowlSkills.filter((skill) =>
    skill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.skillSet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  const renderRow = (row: GameFowlSkill) => (
    <TableRow key={`${row.type}-${row.category}`}>
      <TableCell className="w-1/4">
        <Typography>{row.type}</Typography>
      </TableCell>
      <TableCell className="w-1/3">
        <Typography>{row.category}</Typography>
      </TableCell>
      <TableCell className="w-1/6">
        <Typography>{row.skillSet}</Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideClipboardCheck />
          <Typography variant="h1" fontWeight="semiBold">
            Breeding Guide
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md p-5 flex flex-col min-h-screen">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Game Fowl Skills
            </Typography>
          </div>

          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-2 gap-6 flex-grow">
            <div className="items-stretch col-span-12 space-y-4 text-gray-600 flex flex-col">
              <PaginatedTable
                data={paginatedSkills}
                headers={headers}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                onSearchChange={setSearchTerm}
                searchTerm={searchTerm}
                onItemsPerPageChange={setItemsPerPage}
                renderRow={renderRow}
              />
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default index;
