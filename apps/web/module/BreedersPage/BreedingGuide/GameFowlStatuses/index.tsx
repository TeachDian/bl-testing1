"use client";
import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { LucideBookOpen, LucideCircleUser } from "lucide-react";

interface TableData {
  gender: string;
  status: string;
  age: string;
  description: string;
  remarks: string;
}

const tableData: TableData[] = [
  {
    gender: "Female",
    status: "Pullet",
    age: "42 to 183 days old",
    description: "A pullet is a young female game fowl that is past the chick stage but has not yet started laying eggs. They are in the developmental stage and are characterized by their smaller size compared to mature hens.",
    remarks: "Focus: Growth and development, with attention to nutrition and health."
  },
  {
    gender: "Female",
    status: "Hen",
    age: "184 to 365 days old",
    description: "A hen is an adult female game fowl that has reached maturity and is capable of laying eggs. They are fully grown and have developed the physical characteristics and reproductive capabilities associated with mature female birds.",
    remarks: "Role: Primarily used for breeding and egg production."
  },
  {
    gender: "Female",
    status: "Brood Hen",
    age: "366 to 1,095 days old (1 to 3 years)",
    description: "A brood hen is a mature hen specifically used for breeding purposes. These hens are often selected based on their reproductive health, maternal instincts, and the quality of their offspring.",
    remarks: "Traits: Chosen based on genetic traits, egg production, and mothering abilities."
  },
  {
    gender: "Male",
    status: "Cockerel",
    age: "42 to 183 days old",
    description: "A cockerel is a young male game fowl that is past the chick stage but not yet fully mature. They are in the developmental stage, characterized by their growth spurts and emerging secondary sexual characteristics.",
    remarks: "Focus: Growth, development of physical strength, and early training."
  },
  {
    gender: "Male",
    status: "Cock",
    age: "183 to 365 days old",
    description: "A cock is a mature male game fowl, fully grown and typically used for breeding or fighting purposes. Cocks exhibit strong physical characteristics, including a robust build, well-developed comb, and spurs.",
    remarks: "Role: Can be used for breeding or fighting, depending on physical condition and training."
  },
  {
    gender: "Male",
    status: "Stag",
    age: "183 to 365 days old",
    description: "A stag is a young male game fowl that is older than a cockerel but not yet fully mature. They are in the intermediate stage of development, showing more pronounced features and behaviors associated with adult males.",
    remarks: "Focus: Training for fighting, with an emphasis on developing skills, strength, and stamina. Status: Not fully mature but nearing readiness for competition."
  },
  {
    gender: "Male",
    status: "Brood Cock",
    age: "366 to 1,095 days old (1 to 3 years)",
    description: "A brood cock is a mature male game fowl specifically used for breeding. These cocks are selected based on their genetics, physical characteristics, and the quality of their offspring.",
    remarks: "Traits: Selected for genetic qualities, physical condition, and temperament."
  },
  {
    gender: "Male",
    status: "Fighter",
    age: "365 and 548 days old",
    description: "A fighter is a game fowl bred and trained for cockfighting. These birds are selected for their aggression, physical strength, and fighting abilities. They are usually mature cocks that have undergone extensive training and conditioning.",
    remarks: "Conditioning: Undergoes rigorous training, diet, and health management to ensure peak performance. Status: Actively participating in fights or ready for competition."
  },
];

const GameFowlStatuses: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.age.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchTerm.toLowerCase())
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
              Game Fowl Statuses
            </Typography>
          </div>
          <div className="border-b py-2"></div>

          <div className="mt-4">
            <PaginatedTable
              data={filteredData}
              headers={["Game Fowl Gender", "Game Fowl Status", "Age", "Description", "Remarks"]}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onItemsPerPageChange={setItemsPerPage}
              renderRow={(item: TableData) => (
                <TableRow key={item.status}>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              )}
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default GameFowlStatuses;
