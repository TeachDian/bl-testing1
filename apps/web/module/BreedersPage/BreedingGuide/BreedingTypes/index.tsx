"use client";
import { useState } from "react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Typography } from "@/common/components/ui/Typography";
import { LucideSquareGantt, LucideBookText } from "lucide-react";

// Define the BreedingType interface
interface BreedingType {
  type: string;
  description: string;
  purpose: string;
  remarks: string;
  example: string;
}

const headers = [
  "Game Fowl Breeding Type",
  "Description",
  "Purpose",
  "Remarks",
  "Example",
];

const BreedingTypes: BreedingType[] = [
  {
    type: "Inbreeding",
    description: "Mating closely related birds, such as siblings, parent-offspring, or half-siblings.",
    purpose: "To fix desired traits and increase uniformity in the offspring.",
    remarks: "Risks: Can lead to inbreeding depression, where harmful recessive traits become more prominent, reducing overall health and vitality.",
    example: "Breeding a champion game cock with its offspring to preserve fighting ability.",
  },
  {
    type: "Linebreeding",
    description: "A controlled form of inbreeding where birds that are not as closely related (e.g., cousins or grandparent-grandchild) are mated.",
    purpose: "To concentrate the genes of a particular superior ancestor while minimizing the risks of inbreeding depression.",
    remarks: "Benefits: Helps maintain genetic diversity while still enhancing specific desirable traits.",
    example: "Mating a game cock with its grandchild to strengthen specific characteristics without excessive inbreeding.",
  },
  {
    type: "Outbreeding (Outcrossing)",
    description: "Mating unrelated birds from different lines or breeds.",
    purpose: "To introduce new genes and enhance genetic diversity.",
    remarks: "Often results in hybrid vigor (heterosis), where the offspring are healthier and more vigorous than the parents.",
    example: "Breeding an American Game fowl with a Spanish Game fowl to introduce new genetic traits and enhance performance.",
  },
  {
    type: "Crossbreeding",
    description: "Mating birds from two different breeds to combine traits from both.",
    purpose: "To produce offspring that inherit desirable traits from both parent breeds.",
    remarks: "Benefits: Can create unique combinations of traits, improve performance, and increase genetic diversity.",
    example: "Crossing an Asil with an Old English Game to combine the Asil’s robustness with the Old English Game’s speed and agility.",
  },
  {
    type: "Backcrossing",
    description: "Mating a hybrid offspring back to one of its parent breeds.",
    purpose: "To reinforce specific traits from one of the original parent breeds.",
    remarks: "Benefits: Helps solidify desired traits in the gene pool and can gradually introduce new traits into a line.",
    example: "Breeding a crossbred game fowl back to one of its purebred parents to strengthen a specific characteristic, such as feather quality.",
  },
  {
    type: "Grading Up",
    description: "Continuously breeding a hybrid or crossbred bird back to a purebred of one of the parent breeds over several generations.",
    purpose: "To gradually convert a population to a new breed while retaining some traits of the original breed.",
    remarks: "Benefits: Useful for incorporating specific traits into a breed without completely losing the original breed’s characteristics.",
    example: "Breeding successive generations of crossbred birds with a purebred game fowl to establish a new line with desired traits.",
  },
  {
    type: "Selective Breeding",
    description: "Carefully choosing which birds to breed based on specific desired traits.",
    purpose: "To improve or enhance certain characteristics within a population.",
    remarks: "Benefits: Increases the prevalence of desirable traits and improves the overall quality of the birds.",
    example: "Selecting only the best performing game cocks and hens for breeding to enhance fighting ability.",
  },
];

const BreedingGuide = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBreedingTypes = BreedingTypes.filter((type) =>
    type.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBreedingTypes = filteredBreedingTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBreedingTypes.length / itemsPerPage);

  const renderRow = (row: BreedingType) => (
    <TableRow key={row.type}>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.purpose}</TableCell>
      <TableCell>{row.remarks}</TableCell>
      <TableCell>{row.example}</TableCell>
    </TableRow>
  );

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideSquareGantt />
          <Typography variant="h1" fontWeight="semiBold">
            Breeding Guide
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookText />
            <Typography variant="h3" fontWeight="semiBold">
              Breeding Types
            </Typography>
          </div>

          <div className="border-b py-2"></div>

          <div className="mt-4">
            <PaginatedTable
              data={paginatedBreedingTypes}
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
    </WidthWrapper>
  );
};

export default BreedingGuide;
