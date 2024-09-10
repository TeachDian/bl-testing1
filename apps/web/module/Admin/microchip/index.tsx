"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { T_Microchip } from "@repo/contract";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideCpu, LucideFileUp, LucidePenLine } from "lucide-react";
import { Spinner } from "@/common/components/ui/Spinner";
import useUploadMicrochipCSV from "./hooks/useUploadMicrochipCsv";
import { addMicrochipId } from "./hooks/useAddMicrochipId";
import { getMicrochipIds } from "./hooks/useGetmicrochip";

const AddMicrochip = () => {
  const { register, handleSubmit } = useForm<T_Microchip>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [microchipNumber, setMicrochipNumber] = useState<string>("");
  const {
    mutate: uploadCSV,
    isPending: isUploadPending,
    error: uploadError,
    data: uploadData,
  } = useUploadMicrochipCSV();

  useEffect(() => {
    if (uploadData) {
      toast.success("Upload successful!");
    }
  }, [uploadData]);

  useEffect(() => {
    if (uploadError) {
      toast.error(`Upload Error: ${uploadError.message}`);
    }
  }, [uploadError]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const checkDuplicateMicrochipId = async (
    microchipId: string | number
  ): Promise<boolean> => {
    console.log(`Checking microchipId: ${microchipId}`);

    try {
      const response = await getMicrochipIds();
      const microchips = response?.items || [];

      console.log(
        "Existing microchipIds:",
        microchips.map((m: T_Microchip) => m.microchipId)
      );

      return microchips.some((microchip: T_Microchip) => {
        console.log(
          `Comparing with existing microchipId: ${microchip.microchipId}`
        );
        return microchip.microchipId === microchipId;
      });
    } catch (error) {
      console.error("Error fetching microchip IDs:", error);
      return false;
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const rows = text.trim().split("\n");

        const microchipIdsFromFile = rows.slice(1).map((row) => {
          const columns = row.split(",");
          const id = String(columns?.[0]).trim();
          return id;
        });

        const duplicateMicrochips = [];

        for (const id of microchipIdsFromFile) {
          const isDuplicate = await checkDuplicateMicrochipId(id);
          if (isDuplicate) {
            duplicateMicrochips.push(id);
          }
        }

        if (duplicateMicrochips.length > 0) {
          toast.error(
            `Duplicate microchip IDs found in CSV: ${duplicateMicrochips.join(", ")}`
          );
        } else {
          uploadCSV(selectedFile);
          setSelectedFile(null);
        }
      };

      reader.onerror = (event) => {
        toast.error(`Error reading file: ${event.target?.error?.message}`);
      };

      reader.readAsText(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  const onSubmit = async (formData: T_Microchip) => {
    const isDuplicate = await checkDuplicateMicrochipId(formData.microchipId);

    if (isDuplicate) {
      toast.error("Microchip ID already exists in the database.");
      return;
    }

    try {
      const response = await addMicrochipId(formData);
      if (!response.error) {
        toast.success(response.message);
        setMicrochipNumber("");
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error(String(err));
    }
  };

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideCpu />
          <Typography variant="h1" fontWeight="semiBold">
            Add Microchip
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideFileUp />
            <Typography variant="h3" fontWeight="semiBold">
              Add or upload your microchip number
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
                  <div className="sm:flex mb-4 gap-2">
                    <LucidePenLine size={20} className="mt-2" />
                    <Typography fontWeight="semiBold" className="w-48 mt-2">
                      Microchip no.
                    </Typography>
                    <div className="flex flex-col gap-2 flex-1">
                      <Input
                        placeholder="Enter microchip number"
                        required
                        {...register("microchipId", {
                          required: "You need to fill up this field",
                        })}
                        className="flex-1"
                        value={microchipNumber}
                        onChange={(e) => setMicrochipNumber(e.target.value)}
                      />
                      <Button
                        className="w-full max-w-[120px] self-end"
                        variant="default"
                        size="lg"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="sm:flex mb-4 gap-2">
                    <LucidePenLine size={20} className="mt-2" />
                    <Typography fontWeight="semiBold" className="w-48 mt-2">
                      Import CSV
                    </Typography>
                    <div className="flex flex-col gap-2 flex-1">
                      <Input
                        placeholder="Upload CSV file"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                      <Button
                        className="w-full max-w-[120px] self-end"
                        variant="default"
                        size="lg"
                        type="button"
                        onClick={handleUploadClick}
                      >
                        {isUploadPending ? <Spinner size="md" /> : "Upload CSV"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default AddMicrochip;
