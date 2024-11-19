import { Loader2 } from 'lucide-react';

export const ProcessingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4 text-center space-y-4">
        <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
        <div>
          <h3 className="text-lg font-semibold">Processing Image</h3>
          <p className="text-sm text-gray-500">This may take a few moments...</p>
        </div>
      </div>
    </div>
  );
};