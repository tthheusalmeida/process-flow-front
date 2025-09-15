import { NodeProps } from "@xyflow/react";
import { FileText } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

interface ILink {
  label: string;
  link: string;
}

export default function NodeDocument({ data, id }: NodeProps) {
  const links = ((data.links as ILink[]) ?? []).map((link: ILink) => ({
    ...link,
    link: link.link.startsWith("http") ? link.link : `https://${link.link}`,
  }));

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
        <div className="flex flex-col gap-1">
          {links?.length > 0 ? (
            links.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="text-blue-600 underline"
              >
                {item.label}
              </a>
            ))
          ) : (
            <div className="text-xs text-yellow-600 text-center py-2 italic">
              No registered link for document
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
}
