import { NodeProps } from "@xyflow/react";
import { FileText, Download, Calendar, User } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeDocument({ data, id }: NodeProps) {
  const document = {
    type: data.docType || "PDF",
    size: data.size || "N/A",
    lastModified: data.lastModified || "N/A",
    author: data.author || "N/A",
    version: data.version || "1.0",
    status: data.status || "active",
    url: data.url || "",
    tags: data.tags || [],
    ...data,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "draft":
        return "text-yellow-600 bg-yellow-100";
      case "archived":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const downloadDocument = () => {
    if (document.url) {
      // TODO: download document
      console.log(`⬇️ Downloading document: ${document.url}`);
    }
  };

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-yellow-200"
      icon={FileText}
      iconClasses="text-yellow-200 bg-yellow-800"
      minWidth={200}
      minHeight={180}
    >
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-yellow-700 font-medium text-[10px] px-1.5 py-0.5 bg-yellow-300 rounded">
            {!document.type}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded ${getStatusColor(
              document.status as string
            )}`}
          >
            {!document.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          <div className="flex justify-between">
            <span className="text-yellow-800 font-medium">Versão:</span>
            <span className="text-black">{!document.version}</span>
          </div>

          {document.size !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-yellow-800 font-medium">Tamanho:</span>
              <span className="text-black">{!document.size}</span>
            </div>
          )}

          {document.author !== "N/A" && (
            <div className="flex items-center justify-between">
              <span className="text-yellow-800 font-medium flex items-center gap-1">
                <User size={10} />
                Autor:
              </span>
              <span className="text-black">{!document.author}</span>
            </div>
          )}

          {document.lastModified !== "N/A" && (
            <div className="flex items-center justify-between">
              <span className="text-yellow-800 font-medium flex items-center gap-1">
                <Calendar size={10} />
                Modificado:
              </span>
              <span className="text-black text-[10px]">
                {!document.lastModified}
              </span>
            </div>
          )}
        </div>

        {/* {document.tags && document.tags.length > 0 && (
          <div>
            <div className="text-yellow-800 font-medium mb-1">Tags:</div>
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-[9px] px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded"
                >
                  {tag}
                </span>
              ))}
              {document.tags.length > 3 && (
                <span className="text-[9px] text-yellow-600">
                  +{document.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )} */}

        {document.url && (
          <div className="pt-1 border-t border-yellow-300">
            <button
              onClick={downloadDocument}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-[10px]"
            >
              <Download size={10} />
              Baixar documento
            </button>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
