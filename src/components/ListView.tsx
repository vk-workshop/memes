import {
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useState } from "react";

import { EditModal } from "./EditModal";

import { SortBy } from "@/types/types";
import { ListViewProps, Meme } from "@/types/interfaces";

export function ListView({ memes, setMemes }: ListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [editMeme, setEditMeme] = useState<Meme | null>(null);

  const filteredMemes = memes
    .filter((meme) =>
      meme.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "likes") return b.likes - a.likes;

      return 0;
    });

  const handleLike = (id: number) => {
    setMemes(
      memes.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m)),
    );
  };

  const handleSave = (updatedMeme: Meme) => {
    setMemes(memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)));
    setEditMeme(null);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex gap-4 items-stretch sm:items-center pb-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search memes..."
            startContent={
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            className="rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 py-2 px-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </div>

      {filteredMemes.length === 0 ? (
        <div className="text-center text-gray-500">No memes found.</div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {/* <div className="gap-2 grid grid-cols-2 sm:grid-cols-4"> */}
          {filteredMemes.map((meme) => (
            <Card key={meme.id} shadow="sm">
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={meme.name}
                  className="h-full object-cover"
                  fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                  height={300}
                  radius="lg"
                  shadow="sm"
                  src={meme.image}
                  width="100%"
                />
              </CardBody>

              <h3 className="text-lg font-semibold p-2">{meme.name}</h3>

              <CardFooter className="text-small justify-between">
                <Button
                  className="flex items-center gap-1"
                  variant="ghost"
                  onPress={() => handleLike(meme.id)}
                >
                  <span>{meme.likes} ❤️</span>
                </Button>

                <a
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                  href={meme.image}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>View Source</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <EditModal
        isOpen={editMeme !== null}
        meme={editMeme}
        onClose={() => setEditMeme(null)}
        onSave={handleSave}
      />
    </div>
  );
}
