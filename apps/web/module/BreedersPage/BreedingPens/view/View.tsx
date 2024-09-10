"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Typography } from "@/common/components/ui/Typography";
import { Input } from "@/common/components/shadcn/ui/input";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import useGetBreederModule from "@/common/hooks/Breeder-Module/useGetBreederModule";
import useGetBreedingPenById from "@/common/hooks/Breeder-Module/useGetBreedingPenById";
import { LucideSquareGantt } from "lucide-react";
import { Button } from "@/common/components/shadcn/ui/button";
import { T_Genetic_Composition } from "@repo/contract";

interface BroodCock {
  _id: string;
  wingBandNumber: string;
  microchipNumber: string;
  markings: string;
  dateOfBirth: string;
  gender: string;
  bodyColor: string;
  legColor: string;
  originFarm: string;
  vaccine: string;
  status: string;
  geneticComposition: T_Genetic_Composition[];
  comb: string;
  history: string;
  miscellaneous: string;
  photos: any[];
  createdAt: string;
  __v: number;
}

interface ForBreedingItem {
  broodCock: BroodCock;
  broodCockDescription: string;
  broodHen: BroodCock; // Assuming structure is similar to BroodCock
  broodHenDescription: string;
  offspringGeneticComposition: string;
  _id: string;
}

interface ForBreeding {
  microchipCock: string;
  wingBandCock: string;
  broodCockDescription: string;
  microchipHen: string;
  wingBandHen: string;
  broodHenDescription: string;
  offspringGeneticComposition: string;
}

const ViewBreedingPen = () => {
  const params = useParams<{ breedingPenId: string }>();
  const breedingPenId = params.breedingPenId;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    data: breederModuleData,
    isLoading: isBreederModuleLoading,
    error: breederModuleError,
  } = useGetBreederModule();

  const {
    data: breedingPenData,
    isLoading: isBreedingPenLoading,
    error: breedingPenError,
  } = useGetBreedingPenById(breedingPenId);

  const breedingSeasonTitle =
    breedingPenData?.item?.breedingSeason?.breedingSeasonTitle || "";
  const breedingDate = breedingPenData?.item?.breedingDate || "";
  const breedingPen = breedingPenData?.item?.breedingPen || "";

  const forBreeding: ForBreeding[] =
    breedingPenData?.item?.forBreeding.map((item: ForBreedingItem) => ({
      microchipCock: item.broodCock.microchipNumber,
      wingBandCock: item.broodCock.wingBandNumber,
      broodCockDescription: item.broodCockDescription,
      microchipHen: item.broodHen.microchipNumber,
      wingBandHen: item.broodHen.wingBandNumber,
      broodHenDescription: item.broodHenDescription,
      offspringGeneticComposition: item.offspringGeneticComposition,
    })) || [];

  if (isBreederModuleLoading || isBreedingPenLoading)
    return <div>Loading...</div>;
  if (breederModuleError || breedingPenError)
    return <div>Error loading data</div>;

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex justify-between items-center">
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            Breeding Pens
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideSquareGantt size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Breeding Details
            </Typography>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Season Date</label>
              <Input
                type="text"
                value={
                  breedingDate
                    ? new Date(
                        breedingDate
                      ).toLocaleDateString()
                    : ""
                }
                readOnly
                className="w-[70%]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Breeding Category</label>
              <Input
                type="text"
                value={breedingSeasonTitle || ""}
                readOnly
                className="w-[70%]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Breeding Pen</label>
              <Input
                type="text"
                value={breedingPen || ""}
                readOnly
                className="w-[70%]"
              />
            </div>
            <div className="flex justify-end col-span-3">
              <Button variant="outline">Download</Button>
            </div>
          </div>

          <div className="mt-4">
            <Typography
              variant="h3"
              fontWeight="semiBold"
              className="text-gray-900"
            >
              Predicted Offsprings
            </Typography>
            <h3 className="border-t py-2 mt-4"></h3>
            <PaginatedTable
              data={forBreeding}
              headers={[
                "Microchip",
                "Wing Band",
                "Brood Cock Cross/Breed",
                "Microchip",
                "Wing Band",
                "Brood Hen Cross/Breed",
                "Offspring / Breed",
              ]}
              renderRow={(row: ForBreeding) => (
                <TableRow key={`${row.microchipCock}-${row.microchipHen}`}>
                  <TableCell>{row.microchipCock || "No Microchip"}</TableCell>
                  <TableCell>{row.wingBandCock || "No Wing Band"}</TableCell>
                  <TableCell>
                    {row.broodCockDescription || "No Brood Cock Description"}
                  </TableCell>
                  <TableCell>{row.microchipHen || "No Microchip"}</TableCell>
                  <TableCell>{row.wingBandHen || "No Wing Band"}</TableCell>
                  <TableCell>
                    {row.broodHenDescription || "No Brood Hen Description"}
                  </TableCell>
                  <TableCell>
                    {row.offspringGeneticComposition ||
                      "No Offspring Genetic Composition"}
                  </TableCell>
                </TableRow>
              )}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(forBreeding.length / itemsPerPage)}
              onSearchChange={() => {}}
              searchTerm={""}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default ViewBreedingPen;
