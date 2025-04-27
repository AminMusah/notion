"use client";
import React, { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Block, PartialBlock } from "@blocknote/core";
import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";

type Props = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

function Editor({ onChange, initialContent, editable }: Props) {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editable
        editor={editor}
        onChange={() => {
          // Saves the document JSON to state.
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default Editor;
