"use client";
import { useEffect, useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { convertToFraction } from "../../../../api/src/routes/api/breeder-module/helpers/ConvertToFraction";
import { LucideBookText, LucidePenLine, LucideSquareGantt } from "lucide-react";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import toast from "react-hot-toast";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { T_Breeding_Pens } from "@repo/contract";
import { useForm } from "react-hook-form";
import useAddForBreeding from "../hooks/useAddForBreeding";
import Dropdown, {
  DropdownItem,
} from "@/module/LandingPage/components/DropDown";
import useGetAllGameFowlMaterials from "@/common/hooks/Breeder-Module/useGetAllGameFowlMaterials";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

interface ForBreeding {
  broodCock: string;
  broodCockDescription: string;
  broodCockMicrochip: string;
  broodCockWingband: string;
  broodHen: string;
  broodHenDescription: string;
  broodHenMicrochip: string;
  broodHenWingband: string;
  offspringGeneticComposition: string;
}

const BreedingPens = () => {
  const params = useParams<{ breedingpenId: string }>();
  const breedingpenId = params.breedingpenId;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [forBreeding, setForBreeding] = useState<ForBreeding[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [breedingDate, setBreedingDate] = useState<string>("");
  const { mutateAsync: addForBreeding } = useAddForBreeding();
  const { data: gameFowlMaterialsData } = useGetAllGameFowlMaterials();
  const { register, handleSubmit, watch } = useForm<T_Breeding_Pens>();
  const [selectedBroodCock, setSelectedBroodCock] =
    useState<DropdownItem | null>(null);
  const [selectedBroodHen, setSelectedBroodHen] = useState<DropdownItem | null>(
    null
  );
  const [selectedBreedingSeason, setSelectedBreedingSeason] =
    useState<DropdownItem | null>(null);
  const eventDescription = watch("offspringMarkings", "");
  const maxDescriptionLength = 500;
  const queryClient = useQueryClient();
  const router = useRouter();

  const filteredBroodCock: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.wingBandNumber,
    value: item._id,
  }));
  const filteredBroodHen: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.microchipNumber,
    value: item._id,
  }));

  const handleAddOffspring = async () => {
    if (!selectedBroodCock || !selectedBroodHen) {
      console.error("Brood Cock or Brood Hen not selected.");
      return;
    }

    try {
      const existingBroodCock = gameFowlMaterialsData?.items.find(
        (item: any) => item._id === selectedBroodCock.id
      );
      const existingBroodHen = gameFowlMaterialsData?.items.find(
        (item: any) => item._id === selectedBroodHen.id
      );

      if (!existingBroodCock || !existingBroodHen) {
        throw new Error("Invalid BroodCock or BroodHen!");
      }

      const broodCockDescription = existingBroodCock.geneticComposition
        .map(
          (comp: any) =>
            `${comp.geneticFraction ?? ""} ${comp.breedType?.gameFowlType ?? ""}`
        )
        .filter(Boolean)
        .join(" + ");

      const broodHenDescription = existingBroodHen.geneticComposition
        .map((comp: any) => {
          const fraction =
            comp.geneticPercentage === 1 ? "1" : comp.geneticFraction ?? "";
          return `${fraction} ${comp.breedType?.gameFowlType ?? ""}`;
        })
        .filter(Boolean)
        .join(" + ");

      const broodCockComposition = existingBroodCock.geneticComposition
        .filter(
          (comp: any) =>
            comp.geneticPercentage != null && comp.breedType != null
        )
        .map((comp: any) => ({
          breedType: comp.breedType,
          percentage: comp.geneticPercentage! * 0.5,
        }));

      const broodHenComposition = existingBroodHen.geneticComposition
        .filter(
          (comp: any) =>
            comp.geneticPercentage != null && comp.breedType != null
        )
        .map((comp: any) => ({
          breedType: comp.breedType,
          percentage: comp.geneticPercentage! * 0.5,
        }));

      const combinedComposition = [
        ...broodCockComposition,
        ...broodHenComposition,
      ];

      const summedComposition = combinedComposition.reduce(
        (acc, curr) => {
          const existing = acc.find(
            (comp: { breedType: any; percentage: number }) =>
              String(comp.breedType._id) === String(curr.breedType._id)
          );

          if (existing) {
            existing.percentage += curr.percentage;
          } else {
            acc.push(curr);
          }
          return acc;
        },
        [] as { breedType: any; percentage: number }[]
      );

      const offspringGeneticComposition = summedComposition
        .map((comp: any) => {
          const fraction = convertToFraction(comp.percentage);
          return `${fraction} ${comp.breedType?.gameFowlType ?? ""}`;
        })
        .join(" + ");

      const newForBreeding: ForBreeding = {
        broodCock: String(selectedBroodCock.id),
        broodCockDescription,
        broodCockMicrochip: existingBroodCock.microchipNumber,
        broodCockWingband: existingBroodCock.wingBandNumber,
        broodHen: String(selectedBroodHen.id),
        broodHenDescription,
        broodHenMicrochip: existingBroodHen.microchipNumber,
        broodHenWingband: existingBroodHen.wingBandNumber,
        offspringGeneticComposition,
      };

      setForBreeding((prev: ForBreeding[]) => [...prev, newForBreeding]);
    } catch (error) {
      console.error("Error adding offspring:", error);
    }
  };

  const handleDelete = (broodCockId: string) => {
    console.log("Delete function called for broodCockId:", broodCockId);
    setForBreeding((prev: ForBreeding[]) => {
      const updated = prev.filter((item) => item.broodCock !== broodCockId);
      console.log("Updated forBreeding after delete:", updated);
      return updated;
    });
  };

  useEffect(() => {
    console.log("For Breeding:", forBreeding);
  }, [forBreeding]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onSubmit = async (formData: T_Breeding_Pens) => {
    try {
      const modifiedFormData = {
        ...formData,
        breedingDate,
        forBreeding,
      };

      const response = await addForBreeding(modifiedFormData);
      console.log(response);
      if (!response.error) {
        const newActivityId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["activities", newActivityId],
        });
        setTimeout(() => {
          router.push(`/breeders/breeding-pens/${breedingpenId}/view`);
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(String(err));
    }
  };

  // Filtering and Pagination logic
  const filteredForBreeding = forBreeding.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.broodCock.toLowerCase().includes(searchLower) ||
      item.broodHen.toLowerCase().includes(searchLower) ||
      item.broodCockMicrochip.toLowerCase().includes(searchLower) ||
      item.broodCockWingband.toLowerCase().includes(searchLower) ||
      item.broodCockDescription.toLowerCase().includes(searchLower) ||
      item.broodHenMicrochip.toLowerCase().includes(searchLower) ||
      item.broodHenWingband.toLowerCase().includes(searchLower) ||
      item.broodHenDescription.toLowerCase().includes(searchLower) ||
      item.offspringGeneticComposition.toLowerCase().includes(searchLower)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedForBreeding = filteredForBreeding.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredForBreeding.length / itemsPerPage);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center">
            <LucideSquareGantt />
            <Typography variant="h1" fontWeight="semiBold">
              Breeding Pens
            </Typography>
          </div>

          <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
            <div className="flex gap-2 items-center">
              <LucideBookText />
              <Typography variant="h3" fontWeight="semiBold">
                Set up Breeding Pens
              </Typography>
            </div>

            <div className="border-b py-2"></div>
            <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
              <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
                <div className="sm:flex items-center gap-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Breeding Category
                  </Typography>
                  <Dropdown
                    items={filteredBroodCock}
                    selectedItem={selectedBreedingSeason}
                    onSelectItem={setSelectedBreedingSeason}
                    placeholder="Select breeding category"
                  />
                </div>

                <div className="sm:flex items-center mb-4 gap-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Breeding Date
                  </Typography>
                  <Input
                    type="date"
                    className="flex-1 w-full flex flex-col"
                    required
                    value={breedingDate}
                    onChange={(e) => setBreedingDate(e.target.value)}
                  />
                </div>
                <div className="sm:flex items-center mb-4 gap-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Breeding Pen
                  </Typography>
                  <Input
                    placeholder="Enter pen number"
                    required
                    className="flex-1"
                    {...register("breedingPen")}
                  />
                </div>
                <div className="sm:flex items-center mb-4 gap-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Brood Cock
                  </Typography>
                  <Dropdown
                    items={filteredBroodCock}
                    selectedItem={selectedBroodCock}
                    onSelectItem={(item) => setSelectedBroodCock(item)}
                    placeholder="Enter Brood Cock Microchip or Wing Band No."
                  />
                </div>
                <div className="sm:flex items-center mb-4 gap-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Brood Hen
                  </Typography>
                  <Dropdown
                    items={filteredBroodHen}
                    selectedItem={selectedBroodHen}
                    onSelectItem={(item) => setSelectedBroodHen(item)}
                    placeholder="Enter Brood Hen Microchip or Wing Band No."
                  />
                </div>
                <div className="sm:flex items gap-2 mt-2">
                  <LucidePenLine size={20} />
                  <Typography fontWeight="semiBold" className="w-48">
                    Markings of OffSprings
                  </Typography>
                  <div className="sm:w-80 w-full flex flex-col">
                    <Textarea
                      placeholder="Enter markings for offspring"
                      className="w-full text-justify"
                      maxLength={maxDescriptionLength}
                      {...register("offspringMarkings", { required: true })}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {eventDescription?.length}/{maxDescriptionLength}
                    </div>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      onClick={handleAddOffspring}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Typography
                variant="h3"
                fontWeight="semiBold"
                className="text-gray-900"
              >
                Predicted Offsprings
              </Typography>
              <h3 className="border-t py-2 mt-4"></h3>

              {/* Displaying the paginated and filtered forBreeding items in the table */}
              <PaginatedTable
                data={paginatedForBreeding}
                headers={[
                  "Microchip",
                  "Wingband",
                  "Brood Cock Cross/Breed",
                  "Microchip",
                  "Wingband",
                  "Brood Hen Cross/Breed",
                  "Offspring / Breed",
                  "Marking of Offspring",
                ]}
                renderRow={(row: ForBreeding) => {
                  return (
                    <TableRow key={row.broodCock}>
                      <TableCell>{row.broodCockMicrochip}</TableCell>
                      <TableCell>{row.broodCockWingband}</TableCell>
                      <TableCell>{row.broodCockDescription}</TableCell>
                      <TableCell>{row.broodHenMicrochip}</TableCell>
                      <TableCell>{row.broodHenWingband}</TableCell>
                      <TableCell>{row.broodHenDescription}</TableCell>
                      <TableCell>{row.offspringGeneticComposition}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => handleDelete(row.broodCock)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                onSearchChange={(term) => setSearchTerm(term)}
                searchTerm={searchTerm}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button type="submit" variant="default" size="lg">
                Save
              </Button>
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </WidthWrapper>
  );
};

export default BreedingPens;
