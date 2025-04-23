import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useState } from "react";

import { EditModal } from "./EditModal";

import { Meme, TableViewProps } from "@/types/interfaces";

export function TableView({ memes, setMemes }: TableViewProps) {
  const [editMeme, setEditMeme] = useState<Meme | null>(null);

  const handleSave = (updatedMeme: Meme) => {
    setMemes(memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)));
    setEditMeme(null);
  };

  return (
    <div className="p-4">
      <Table className="rounded-lg overflow-hidden shadow-lg">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Image URL</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell className="font-medium">{meme.name}</TableCell>
              <TableCell>{meme.image}</TableCell>
              <TableCell>{meme.likes} ❤️</TableCell>
              <TableCell>
                <Button
                  className="text-gray-600 hover:text-primary-600"
                  variant="ghost"
                  onPress={() => setEditMeme(meme)}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditModal
        isOpen={editMeme !== null}
        meme={editMeme}
        onClose={() => setEditMeme(null)}
        onSave={handleSave}
      />
    </div>
  );
}
