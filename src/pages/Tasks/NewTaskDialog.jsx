import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shadcn/components/ui/dialog";

import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";

import React from "react";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import Select from "react-select";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";
import { useDocument } from "@/hooks/useDocument";
import { PlusCircleIcon } from "lucide-react";
import { arrayUnion } from "firebase/firestore";
import { useToast } from "@/shadcn/components/ui/use-toast";

export default function NewTaskDialog({ children }) {
  const { toast } = useToast();
  const { documents: users } = useCollection("users");
  const { document: teamDoc } = useDocument("teams", "7GfinEO9PorcuHkBNb0G");
  const { updateDocument: updateTeam } = useFirestore("teams");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [showNewTagForm, setShowNewTagForm] = useState(false);

  const userOptions = users?.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const tagOptions = teamDoc?.tags.map((tag) => ({ value: tag, label: tag }));

  const addNewTag = async (e) => {
    e.preventDefault();
    if (!newTag) return;
    await updateTeam("7GfinEO9PorcuHkBNb0G", { tags: arrayUnion(newTag) });
    toast({
      title: "Nova tag",
      description: `A tag ${newTag} foi adicionada com sucesso`,
    });
    setNewTag("");
    setShowNewTagForm(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Prencha as informações da nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Título</Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Descrição</Label>
            <Textarea
              id="name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 resize-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Label htmlFor="name">Tags</Label>
              <PlusCircleIcon
                className="h-4 w-4 shrink-0"
                role="button"
                onClick={() => setShowNewTagForm(true)}
              />
              {showNewTagForm && (
                <form onSubmit={addNewTag}>
                  <Input
                    value={newTag}
                    className="h-6"
                    placeholder="Nova tag..."
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </form>
              )}
            </div>
            <Select
              options={tagOptions}
              isMulti
              onChange={(options) => setSelectedTags(options)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Data para conclusão</Label>
            <DatePickerWithPresets date={dueDate} setDate={setDueDate} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Atribuir à</Label>
          </div>
          <Select
            options={userOptions}
            isMulti
            onChange={(options) => setAssignedMembers(options)}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Adicionar Tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
