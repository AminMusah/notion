"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import React, { useState } from "react";
import { SingleImageDropzone } from "../single-dropzone-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { UploaderProvider, type UploadFn } from "../uploader-provider";

const CoverImageModal = () => {
  const { documentId } = useParams() as { documentId: string };
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);
  const [isSubmitting, setIsSubmtting] = useState(false);
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setIsSubmtting(false);
    coverImage.onClose();
  };

  const uploadFn: UploadFn = async ({ file, signal, onProgressChange }) => {
    if (file) {
      setIsSubmtting(true);
    }

    const upload = await edgestore.publicFiles.upload({
      file,
      onProgressChange,
      signal,
      options: {
        replaceTargetUrl: coverImage.url,
      },
    });

    await update({
      id: documentId as Id<"documents">,
      coverImage: upload.url,
    });

    onClose();

    return { url: upload.url };
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <UploaderProvider uploadFn={uploadFn} autoUpload={true}>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            width={400}
            height={200}
          />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
