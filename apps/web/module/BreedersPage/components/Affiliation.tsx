import React, { useState } from "react";
import { Button } from "@/common/components/shadcn/ui/button";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown from "@/module/LandingPage/components/DropDown";

interface DropdownItem {
  id: number;
  item: string;
}

const Federation: DropdownItem[] = [
  { id: 1, item: "American fowl type" },
  { id: 2, item: "Filipino fowl type" },
  { id: 3, item: "High-breed fowl type" },
];

const LocalAssociation: DropdownItem[] = [
  { id: 1, item: "Association 1" },
  { id: 2, item: "Association 2" },
  { id: 3, item: "Association 3" },
];

const Affiliation = () => {
  const [affiliations, setAffiliations] = useState<
    { federation: DropdownItem | null; association: DropdownItem | null }[]
  >([]);
  const [selectedFederation, setSelectedFederation] =
    useState<DropdownItem | null>(null);
  const [selectedAssociation, setSelectedAssociation] =
    useState<DropdownItem | null>(null);

  const handleAddAffiliation = () => {
    if (selectedFederation && selectedAssociation) {
      setAffiliations([
        ...affiliations,
        { federation: selectedFederation, association: selectedAssociation },
      ]);
      setSelectedFederation(null);
      setSelectedAssociation(null);
    }
  };

  const handleDeleteAffiliation = (index: number) => {
    setAffiliations(affiliations.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="row-1">
          <Typography
            variant="h3"
            fontWeight="semiBold"
            className="text-gray-900"
          >
            Affiliations
          </Typography>
        </div>
        <div className=" row pb-2">
          <Button variant="default" size="lg" onClick={handleAddAffiliation}>
            Add
          </Button>
        </div>
      </div>
      <div className="border-t rounded-md pt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border text-center px-4 py-2">Federation</th>
              <th className="border text-center px-4 py-2">Association</th>
              <th className="border text-center px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {affiliations.map((affiliation, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {affiliation.federation?.item}
                </td>
                <td className="border px-4 py-2">
                  {affiliation.association?.item}
                </td>
                <td className="border px-4 py-2">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handleDeleteAffiliation(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2">
                <Dropdown
                  items={Federation}
                  selectedItem={selectedFederation}
                  onSelectItem={setSelectedFederation}
                  placeholder="Select federation"
                  className="z-50 w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <Dropdown
                  items={LocalAssociation}
                  selectedItem={selectedAssociation}
                  onSelectItem={setSelectedAssociation}
                  placeholder="Select local association"
                  className="z-50 w-full"
                />
              </td>
              <td className="border flex justify-center px-4 py-2">
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleAddAffiliation}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" size="lg" className="w-24">
          Edit
        </Button>
        <Button variant="default" size="lg" className="w-24">
          Save
        </Button>
        <Button variant="secondary" size="lg" className="w-24">
          Show
        </Button>
      </div>
    </div>
  );
};

export default Affiliation;
