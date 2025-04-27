"use client";

import dynamic from "next/dynamic";
import { useMemo, use } from "react";
import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

// Add type helper for Usable (if not already defined)
type Usable<T> = Promise<T> | { then(onFulfilled: (value: T) => any): any };

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const resolvedParams = use(
    params as unknown as Usable<{ documentId: Id<"documents"> }>
  );

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: resolvedParams.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: resolvedParams.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
