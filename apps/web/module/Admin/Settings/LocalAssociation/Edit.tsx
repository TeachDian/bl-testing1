"use client";
import { useEffect, useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown, { DropdownItem } from "@/module/LandingPage/components/DropDown";
import useUpdateGameFowlLocalAssociation from "../hooks/useUpdateGameFowlLocalAssociation";
import { T_Update_Game_Fowl_Local_Association } from "@repo/contract";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

interface DataToSubmit {
  federation: string; // Assuming federation should be a string
  localAssociation: string;
}

const UpdateGameFowlLocalAssociation = () => {
  const params = useParams<{ associationId: string }>();
  const associationId = params.associationId;
  const { mutateAsync: updateGameFowlLocalAssociation } = useUpdateGameFowlLocalAssociation(associationId);
  const { register, handleSubmit, formState: { errors } } = useForm<T_Update_Game_Fowl_Local_Association>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFederation, setSelectedFederation] = useState<DropdownItem | null>(null);
  const { data, isPending } = useGetBreederSettings();

  const federationData: DropdownItem[] = (data?.items[0]?.gameFowlFederation || []).map((item: { id: any; federationTitle: any; }) => ({
    id: item.id,
    item: item.federationTitle,
  }));

  const onSubmit = async (formData: T_Update_Game_Fowl_Local_Association) => {
    try {
      const modifiedFormData = {
        ...formData,
        localAssociation: capitalizeFirstLetter(formData.localAssociation),
      };

      setIsLoading(true);

      // Convert federation to string if it's a number
      const federation = selectedFederation?.id.toString() ?? "";

      if (!federation) {
        throw new Error("Please select a game federation");
      }


      const dataToSubmit: DataToSubmit = {
        federation,
        localAssociation: modifiedFormData.localAssociation,
      };

      console.log("Submitting data:", dataToSubmit); 
      const response = await updateGameFowlLocalAssociation(dataToSubmit);

      console.log("Response from API:", response);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/local-association/view`);
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Edit Local Association
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Edit local association</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <label htmlFor="gameFowlSkillSet" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Local Association
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Enter game fowl local association"
        className="sm:w-80 w-full"
        {...register('localAssociation')}
      />

      <div>
        <Dropdown
          items={federationData}
          selectedItem={selectedFederation}
          onSelectItem={setSelectedFederation}
          placeholder="Select game fowl federation"
          label="Federation"
          className="z-20"
        />
      </div>

      <Button
        variant="default"
        size="lg"
        className="mt-32 w-32"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </WidthWrapper>
  );
};

export default UpdateGameFowlLocalAssociation;