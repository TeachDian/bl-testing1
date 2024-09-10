"use client";
import React, { useEffect, useState } from "react";
import AdditionalGameFowlDetails from "./AdditionalGameFowlDetails";
import UploadPhoto from "../components/UploadPhoto";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { LucideBookOpen, LucideCircleUser } from "lucide-react";
import { Button } from "@/common/components/shadcn/ui/button";
import Dropdown from "@/module/LandingPage/components/DropDown";
import useAddGameFowlMaterials from "../hooks/useAddGameFowlMaterials";
import toast from "react-hot-toast";
import useGetAllGameFowlMaterials from "@/common/hooks/Breeder-Module/useGetAllGameFowlMaterials";

interface DropdownItem {
  id: number;
  item: string;
  value?: string;
}

const computeGeneticComposition = (geneticCompositions: any[]) => {
  return geneticCompositions.map((comp) => {
    const geneticPercentage = (comp.input1 / comp.input2) * 100;
    const geneticFraction = `${comp.input1}/${comp.input2}`;
    return {
      ...comp,
      geneticPercentage,
      geneticFraction,
    };
  });
};

const Index = () => {
  const [selectedGender, setSelectedGender] = useState<DropdownItem | null>(
    null
  );
  const [selectedBodyColor, setSelectedBodyColor] =
    useState<DropdownItem | null>(null);
  const [selectedLegColor, setSelectedLegColor] = useState<DropdownItem | null>(
    null
  );
  const [selectedComb, setSelectedComb] = useState<DropdownItem | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<DropdownItem | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DropdownItem | null>(
    null
  );
  const [wingBandNumber, setWingBandNumber] = useState<string>("");
  const [microchipNumber, setMicrochipNumber] = useState<string>("");
  const [markings, setMarkings] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [originFarm, setOriginFarm] = useState<string>("");
  const [vaccine, setVaccine] = useState<string>("");
  const [history, setHistory] = useState<string>("");
  const [miscellaneous, setMiscellaneous] = useState<string>("");
  const [geneticCompositions, setGeneticCompositions] = useState<
    { input1: number; input2: number; breedType: DropdownItem | null; geneticPercentage?: number; geneticFraction?: string }[]
  >([]);
  const [age, setAge] = useState<string>("");
  const { data: gameFowlMaterialsData, isPending } =
    useGetAllGameFowlMaterials();

  const { mutateAsync: addGameFowlMaterials } = useAddGameFowlMaterials();

  const filteredGender: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.gender?.genderTitle,
    value: item._id,
  }));
  const filteredFeatherColor: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.bodyColor?.colorTitle,
    value: item._id,
  }));
    const filteredLegColor: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.legColor?.legColorTitle,
    value: item._id,
  }));
  const filteredComb: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.comb,
    value: item._id,
  }));
  const filteredGfStatus: DropdownItem[] = (
    gameFowlMaterialsData?.items || []
  ).map((item: any) => ({
    id: item._id,
    item: item.status?.gameFowlStatus,
    value: item._id,
  }));
    const filteredBreedType: DropdownItem[] = (
    gameFowlMaterialsData?.items[0]?.geneticComposition || []
  ).map((item: any) => ({
    id: item._id,
    item: item.breedType.gameFowlType,
    value: item._id,
  }));

  const handleAddGeneticComposition = () => {
    if (selectedBreed) {
      const newComposition = {
        input1: 1,
        input2: 2,
        breedType: selectedBreed,
      };
    
      const updatedCompositions = computeGeneticComposition([
        ...geneticCompositions,
        newComposition,
      ]);

      setGeneticCompositions(updatedCompositions);
      setSelectedBreed(null);
    } else {
      toast.error("Please select a breed type");
    }
  };

  const handleDeleteComposition = (index: number) => {
    setGeneticCompositions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const payload = {
        wingBandNumber: wingBandNumber.trim(),
        microchipNumber: microchipNumber.trim(),
        markings: markings.trim(),
        dateOfBirth: new Date(dateOfBirth),
        gender: selectedGender?.id.toString() || "",
        bodyColor: selectedBodyColor?.id.toString() || "",
        legColor: selectedLegColor?.id.toString() || "",
        comb: selectedComb?.id.toString() || "",
        originFarm: originFarm.trim(),
        vaccine: vaccine.trim(),
        status: selectedStatus?.id.toString() || "",
        geneticComposition: geneticCompositions.map((comp) => ({
          input1: comp.input1,
          input2: comp.input2,
          breedType: comp.breedType?.id.toString() || "",
          geneticPercentage: comp.geneticPercentage,
          geneticFraction: comp.geneticFraction,
        })),
        history: history || "",
        miscellaneous: miscellaneous || "",
      };

      const response = await addGameFowlMaterials(payload);
      if (!response.error) {
        toast.success("Game Fowl Materials successfully added!");
      } else {
        toast.error(response.message || "Failed to add Game Fowl Materials.");
      }
    } catch (err) {
      console.error("Error adding Game Fowl Materials:", err);
      toast.error("An error occurred while adding Game Fowl Materials.");
    }
  };

  useEffect(() => {
    if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split("-").map(Number);
  
      if (year !== undefined && month !== undefined && day !== undefined) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
  
        let yearDifference = today.getFullYear() - birthDate.getFullYear();
        let monthDifference = today.getMonth() - birthDate.getMonth();
  
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          yearDifference--;
          monthDifference = (monthDifference + 12) % 12;
        }
  
        let dayDifference = today.getDate() - birthDate.getDate();
        if (dayDifference < 0) {
          monthDifference--;
          if (monthDifference < 0) {
            monthDifference += 12;
            yearDifference--;
          }
        }
  
        let ageString = "";
        if (yearDifference > 0) {
          ageString = `${yearDifference} year${yearDifference !== 1 ? "s" : ""}`;
          if (monthDifference > 0) {
            ageString += ` and ${monthDifference} month${monthDifference !== 1 ? "s" : ""}`;
          }
        } else {
          ageString = `${monthDifference} month${monthDifference !== 1 ? "s" : ""}`;
        }
  
        setAge(ageString);
      } else {
        console.error("Invalid date components");
      }
    }
  }, [dateOfBirth]);
  

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
            Game Fowl Materials
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col mt-10">
          <div className="flex gap-2 items-center">
            <LucideCircleUser size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Game Fowl Details
            </Typography>
          </div>
          <div className="border-b py-2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col space-y-4">
              {/* Static Inputs */}
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Wing/Leg Band Number
                </Typography>
                <input
                  type="text"
                  placeholder="Enter wing/leg band number"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={wingBandNumber}
                  onChange={(e) => setWingBandNumber(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Markings
                </Typography>
                <input
                  type="text"
                  placeholder="Enter game fowl markings"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={markings}
                  onChange={(e) => setMarkings(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Microchip Number
                </Typography>
                <input
                  type="text"
                  placeholder="Enter microchip number"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={microchipNumber}
                  onChange={(e) => setMicrochipNumber(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Date Born
                </Typography>
                <div className="relative flex-grow">
                  <input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Age
                </Typography>
                <input
                  type="text"
                  placeholder="Auto compute based on date of birth"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={age}
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Game Fowl Gender
                </Typography>
                <Dropdown
                  items={filteredGender}
                  selectedItem={selectedGender}
                  onSelectItem={setSelectedGender}
                  placeholder="Select game fowl gender"
                  className="z-6"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Feather Color
                </Typography>
                <Dropdown
                  items={filteredFeatherColor}
                  selectedItem={selectedBodyColor}
                  onSelectItem={setSelectedBodyColor}
                  placeholder="Select game fowl feather color"
                  className="z-5"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Leg Color
                </Typography>
                <Dropdown
                  items={filteredLegColor}
                  selectedItem={selectedLegColor}
                  onSelectItem={setSelectedLegColor}
                  placeholder="Select game fowl leg color"
                  className="z-4"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Comb
                </Typography>
                <Dropdown
                  items={filteredComb}
                  selectedItem={selectedComb}
                  onSelectItem={setSelectedComb}
                  placeholder="Select game fowl comb"
                  className="z-3"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Origin Farm
                </Typography>
                <input
                  type="text"
                  placeholder="Enter origin farm"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={originFarm}
                  onChange={(e) => setOriginFarm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Vaccine
                </Typography>
                <input
                  type="text"
                  placeholder="Enter vaccine"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  value={vaccine}
                  onChange={(e) => setVaccine(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Status
                </Typography>
                <Dropdown
                  items={filteredGfStatus}
                  selectedItem={selectedStatus}
                  onSelectItem={setSelectedStatus}
                  placeholder="Select game fowl status"
                  className="z-2"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="p" fontWeight="semiBold" className="w-1/3">
                  Breed Type
                </Typography>
                <div className="flex items-center flex-grow">
                  <Dropdown
                    items={filteredBreedType}
                    selectedItem={selectedBreed}
                    onSelectItem={setSelectedBreed}
                    placeholder="Select game fowl breed"
                    className="z-1"
                  />
                  <input
                    type="number"
                    placeholder=""
                    className="border border-gray-300 rounded-md p-2 w-16 mx-2"
                    onChange={(e) =>
                      setGeneticCompositions((prev) =>
                        prev.map((comp, index) =>
                          index === prev.length - 1
                            ? { ...comp, input1: parseInt(e.target.value) }
                            : comp
                        )
                      )
                    }
                  />
                  <span>/</span>
                  <input
                    type="number"
                    placeholder=""
                    className="border border-gray-300 rounded-md p-2 w-16 mx-2"
                    onChange={(e) =>
                      setGeneticCompositions((prev) =>
                        prev.map((comp, index) =>
                          index === prev.length - 1
                            ? { ...comp, input2: parseInt(e.target.value) }
                            : comp
                        )
                      )
                    }
                  />
                  <Button
                    variant="default"
                    className="ml-2"
                    onClick={handleAddGeneticComposition}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 items-center">
              <UploadPhoto
                alt="Game Fowl Photo"
                width={250}
                height={200}
                className="custom-class"
              />
              <UploadPhoto
                alt="Game Fowl Leg Photo"
                width={250}
                height={200}
                className="custom-class"
              />
            </div>
          </div>

          {/* Game Fowl Cross Composition Table */}
          <div className="mt-8">
            <div className="flex gap-2 items-center">
              <LucideCircleUser size={20} />
              <Typography variant="h3" fontWeight="semiBold">
                Game Fowl Cross Composition
              </Typography>
            </div>
            <div className="border-b py-2"></div>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">
                    Breed Type
                  </th>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">
                    Genetic Fraction
                  </th>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">
                    Genetic Percentage
                  </th>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {geneticCompositions.map((comp, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 p-2">
                      {comp.breedType?.item ?? ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {comp.geneticFraction}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {comp.geneticPercentage}%
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => handleDeleteComposition(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <div className="flex gap-2 items-center">
              <LucideCircleUser size={20} />
              <Typography variant="h3" fontWeight="semiBold">
                Additional Game Fowl Details
              </Typography>
            </div>
            <div className="border-b py-2"></div>
            <div className="mt-4">
              <div>
                <AdditionalGameFowlDetails
                  label="History"
                  placeholder="Enter game fowl history"
                  value={history}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setHistory(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <AdditionalGameFowlDetails
                  label="Miscellaneous"
                  placeholder="Enter game fowl other details"
                  value={miscellaneous}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setMiscellaneous(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="default" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>

      <footer className="w-full border shadow py-2 flex justify-between items-center bg-white">
        <span className="text-sm font-semibold pl-2">
          2024 @ GFBIMS Version 1.0
        </span>
        <span className="text-sm font-semibold pr-2">
          Powered by iFVSDevTeam
        </span>
      </footer>
    </WidthWrapper>
  );
};

export default Index;
