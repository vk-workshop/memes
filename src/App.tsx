import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarItem } from "@heroui/navbar";
import {
  Table,
  TableRow,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
} from "@heroui/table";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

interface TableViewProps {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

interface EditModalProps {
  isOpen: boolean;
  meme: Meme | null;
  onClose: () => void;
  onSave: (updatedMeme: Meme) => void;
}

interface ListViewProps {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

type SortBy = "name" | "likes" | "default";

const initialMemes: Meme[] = [
  {
    id: 1,
    name: "Siblings",
    image:
      "https://i.pinimg.com/736x/80/23/59/802359b4637eaaa661000b88f3f49063.jpg",
    likes: 58,
  },
  {
    id: 2,
    name: "Letter",
    image:
      "https://i.pinimg.com/originals/72/14/2d/72142dddd3ca0ef2ab9ef1484efb71a6.jpg",
    likes: 39,
  },
  {
    id: 3,
    name: "Crying Jordan",
    image: "https://happymonday.ua/wp-content/uploads/2024/03/4.1.png",
    likes: 82,
  },
  {
    id: 4,
    name: "Frog Simpson",
    image:
      "https://cdn.pixabay.com/photo/2023/09/27/19/07/memes-8280093_1280.jpg",
    likes: 73,
  },
  {
    id: 5,
    name: "Monday",
    image:
      "https://content-happymonday.storage.googleapis.com/2024/04/19175343/image-77.png",
    likes: 66,
  },
  {
    id: 6,
    name: "14 February",
    image:
      "https://konivjab.net/wp-content/uploads/2020/02/koty-valentyna-pislja.jpg",
    likes: 41,
  },
  {
    id: 7,
    name: "Money",
    image: "https://konivjab.net/wp-content/uploads/2022/12/ne-hvata.jpg",
    likes: 87,
  },
  {
    id: 8,
    name: "This Is Fine",
    image: "https://konivjab.net/wp-content/uploads/2019/03/zlamanyh-kotiv.jpg",
    likes: 90,
  },
  {
    id: 9,
    name: "Master cat",
    image:
      "https://konivjab.net/wp-content/uploads/2019/07/kotu-ty-tut-gospodar.jpg",
    likes: 45,
  },
  {
    id: 10,
    name: "Look at Me",
    image:
      "https://konivjab.net/wp-content/uploads/2020/08/kupalnyk-vsi-pobachyly.jpg",
    likes: 52,
  },
];

function App() {
  const [memes, setMemes] = useState<Meme[]>(() => {
    const saved = localStorage.getItem("memes");

    return saved ? JSON.parse(saved) : initialMemes;
  });

  useEffect(() => {
    localStorage.setItem("memes", JSON.stringify(memes));
  }, [memes]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="bg-primary-600 text-primary shadow-lg">
        <NavbarBrand as={Link} className="text-xl font-bold" to="/">
          🎭 Meme
        </NavbarBrand>
        <div className="flex gap-2">
          <NavbarItem
            as={Link}
            className="hover:bg-primary-500 px-4 py-2 rounded-lg transition-colors"
            to="/table"
          >
            Table View
          </NavbarItem>
          <NavbarItem
            as={Link}
            className="hover:bg-primary-500 px-4 py-2 rounded-lg transition-colors"
            to="/list"
          >
            List View
          </NavbarItem>
        </div>
      </Navbar>

      <div className="flex flex-col min-h-screen overflow-auto">
        <Routes>
          <Route element={<Navigate replace to="/table" />} path="/" />
          <Route
            element={<TableView memes={memes} setMemes={setMemes} />}
            path="/table"
          />
          <Route
            element={<ListView memes={memes} setMemes={setMemes} />}
            path="/list"
          />
          <Route element={<div className="p-4">Not Found</div>} path="*" />
        </Routes>
      </div>
    </div>
  );
}

function TableView({ memes, setMemes }: TableViewProps) {
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

function EditModal({ isOpen, meme, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Meme | null>(null);

  useEffect(() => {
    if (meme) {
      setFormData(meme);
    }
  }, [meme]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal className="" isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-xl font-bold border-b">
        Edit Meme
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="">
          <Input
            disabled
            className="bg-gray-50"
            label="ID"
            value={formData.id.toString()}
          />
          <Input
            required
            label="Meme Name"
            maxLength={100}
            minLength={3}
            placeholder="Enter meme name..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            required
            label="Image URL"
            pattern="https?://.+\.(jpg|jpeg|png|gif)"
            placeholder="https://example.com/image.jpg"
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Likes"
              max={99}
              min={0}
              type="number"
              value={formData.likes.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  likes: Math.max(0, Math.min(99, Number(e.target.value))),
                })
              }
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-3 pb-6">
          <Button
            className="text-gray-700 border-gray-300 hover:bg-gray-100"
            variant="bordered"
            onPress={onClose}
          >
            ❌ Cancel
          </Button>
          <Button
            className="text-gray-700 border-gray-300 hover:bg-primary-100"
            type="submit"
          >
            💾 Save Changes
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

function ListView({ memes, setMemes }: ListViewProps) {
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

export default App;
