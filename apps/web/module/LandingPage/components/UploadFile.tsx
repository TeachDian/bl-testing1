"use client";

import { Button } from "@/common/components/shadcn/ui/button";
import { Typography } from "@/common/components/ui/Typography";
import { LucideImage, LucideMinus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function UploadFile() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files.length; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="sm:flex flex-col w-full">
      <form
        className={`${
          dragActive ? "bg-blue-200" : "bg-blue-100"
        } p-4 w-1/3 rounded-lg min-h-[20rem] text-center flex flex-col items-center justify-center cursor-pointer`}
        onClick={openFileExplorer}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept="image/*"
        />

        <LucideImage size={25} />
        <Typography fontWeight="semiBold">
          Drag and drop to upload photo(s)
        </Typography>
        <p>or browse</p>
      </form>

      <div className="flex flex-col p-3 mt-4">
        {files.map((file: any, idx: any) => (
          <div key={idx} className="flex flex-row space-x-5 items-center mt-2">
            {file.type.startsWith('image/') && (
              <Image 
                src={URL.createObjectURL(file)} 
                alt={file.name} 
                width={100}
                height={100}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
            <span>{file.name}</span>

            <Button variant='ghost' size='sm'
              className="text-white cursor-pointer bg-gradient-primary w-8 h-8"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(file.name, idx);
              }}
            >
              <LucideMinus size={20}/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
