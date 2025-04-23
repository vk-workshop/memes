import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { useEffect, useState } from "react";

import { EditModalProps, Meme } from "@/types/interfaces";

export function EditModal({ isOpen, meme, onClose, onSave }: EditModalProps) {
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
