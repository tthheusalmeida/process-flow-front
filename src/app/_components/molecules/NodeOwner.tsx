import { NodeProps } from "@xyflow/react";
import { Users, Plus } from "lucide-react";
import { useState } from "react";
import BaseNode from "../organisms/BaseNode";

interface Person {
  id: string;
  name: string;
  role: string;
}

export default function NodeOwner({ data, id }: NodeProps) {
  const [people] = useState<Person[]>([
    { id: "1", name: "Ana Silva", role: "Gerente" },
    { id: "2", name: "João Santos", role: "Analista" },
  ]);

  const addPerson = () => {
    // TODO: open modal to add new person
    console.log("🧑‍💼 Adding new person to owner", id);
  };

  const removePerson = (personId: string) => {
    // TODO: remove person from owner
    console.log("👋 Removing person", personId, "from owner", id);
  };

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-blue-200"
      icon={Users}
      iconClasses="text-blue-200 bg-blue-800"
      minWidth={220}
      minHeight={140 + people.length * 25} // Altura dinâmica baseada no número de pessoas
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-800">
            Responsáveis ({people.length})
          </span>
          <button
            onClick={addPerson}
            className="p-1 hover:bg-blue-300 rounded transition-colors"
            title="Adicionar pessoa"
          >
            <Plus size={12} className="text-blue-700" />
          </button>
        </div>

        <div className="space-y-1 max-h-32 overflow-y-auto">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between bg-white/50 rounded p-1.5 text-xs"
            >
              <div>
                <div className="font-medium text-black">{person.name}</div>
                {person.role && (
                  <div className="text-blue-600 text-[10px]">{person.role}</div>
                )}
              </div>
              <button
                onClick={() => removePerson(person.id)}
                className="text-red-500 hover:text-red-700 text-[10px]"
                title="Remover pessoa"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {people.length === 0 && (
          <div className="text-xs text-blue-600 text-center py-2 italic">
            Nenhum responsável cadastrado
          </div>
        )}
      </div>
    </BaseNode>
  );
}
