export interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export interface TableViewProps {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

export interface EditModalProps {
  isOpen: boolean;
  meme: Meme | null;
  onClose: () => void;
  onSave: (updatedMeme: Meme) => void;
}

export interface ListViewProps {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}
