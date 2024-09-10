"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucideBoxes, LucidePenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { T_Game_Fowl_Local_Association } from "@repo/contract";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useAddGameFowlLocalAssociation from "../hooks/useAddGameFowlLocalAssociation";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { DropdownItem } from "@/module/LandingPage/components/DropDown";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const AddGameFowlLocalAssociation = () => {
  const { mutateAsync: addGameFowlLocalAssociation } =
    useAddGameFowlLocalAssociation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_Game_Fowl_Local_Association>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFederation, setSelectedFederation] =
    useState<DropdownItem | null>(null);

  const { data, isPending } = useGetBreederSettings();

  useEffect(() => {
    console.log("Fetched breeder settings data:", data);
  }, [data]);

  const federationData: DropdownItem[] = (data?.items[0]?.gameFowlFederation || []).map((item: any) => ({
    _id: item._id,
    item: item.federationTitle,
    value: item._id,
  }));

  useEffect(() => {
    console.log("Fetched data:", data);
    console.log("Federation Data:", federationData);
  }, [data, federationData]);

  const onSubmit = async (formData: T_Game_Fowl_Local_Association) => {
    try {
      const modifiedFormData = {
        ...formData,
        localAssociation: capitalizeFirstLetter(formData.localAssociation),
      };
      setIsLoading(true);
      const federation = selectedFederation?._id ?? "";

      if (!federation) {
        throw new Error("Please select game federation");
      }

      const dataToSubmit = {
        ...modifiedFormData,
        federation
      };

      console.log("Submitting data:", dataToSubmit); // Ensure data is formatted correctly

      const response = await addGameFowlLocalAssociation(dataToSubmit);

      // Verify response and data in the database
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
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideBoxes />
          <Typography variant="h1" fontWeight="semiBold">
            Add Local Association
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Set up local association
            </Typography>
          </div>
          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex-grow flex flex-col justify-between"
              >
                <div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Local Association
                    </Typography>
                    <Input
                      placeholder="Enter game fowl local association"
                      required
                      {...register("localAssociation", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                    {errors.localAssociation && (
                      <Typography className="text-red-600">
                        {errors.localAssociation.message}
                      </Typography>
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Federation
                    </Typography>
                    {federationData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={federationData}
                        selectedItem={selectedFederation}
                        onSelectItem={(item) => setSelectedFederation(item)}
                        placeholder="Select game fowl federation"
                      />
                    )}
                  </div>
                </div>

                <Button
                  className="mt-4 self-start w-32"
                  variant="default"
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="md" /> : "Save | Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default AddGameFowlLocalAssociation;
