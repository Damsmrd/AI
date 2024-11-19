import { Download } from 'lucide-react';

interface ResultCardProps {
  originalImage: string;
  processedImage: string;
  onDownload: () => void;
}

export const ResultCard = ({ originalImage, processedImage, onDownload }: ResultCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Original</p>
          <img 
            src={originalImage} 
            alt="Original" 
            className="w-full rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Processed</p>
          <img 
            src={processedImage} 
            alt="Processed" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
      
      <button
        onClick={onDownload}
        className="flex items-center justify-center w-full gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Result
      </button>
    </div>
  );
};