import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ProcessingOverlay } from '@/components/ProcessingOverlay';
import { ResultCard } from '@/components/ResultCard';
import { toast } from 'sonner';

const Index = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    original: string;
    processed: string;
  } | null>(null);

  const handleProcess = async () => {
    if (!sourceImage || !targetImage) {
      toast.error('Please select both images first');
      return;
    }

    setProcessing(true);
    console.log('Processing images:', sourceImage.name, targetImage.name);

    try {
      // Here you would normally make an API call to process the images
      const reader = new FileReader();
      reader.onload = async (e) => {
        const originalBase64 = e.target?.result as string;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo, we'll just use the same image
        setResult({
          original: originalBase64,
          processed: originalBase64,
        });
        
        toast.success('Images processed successfully!');
      };
      reader.readAsDataURL(sourceImage);
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Error processing images. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.processed;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-white">
      <div className="container py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            AI Face Change
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your photos with our advanced AI face changing technology. 
            Upload two images and see the magic happen!
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ImageUpload 
              label="Source Image" 
              onImageSelect={(file) => setSourceImage(file)} 
            />
            <ImageUpload 
              label="Target Image" 
              onImageSelect={(file) => setTargetImage(file)} 
            />
          </div>
          
          {sourceImage && targetImage && !result && (
            <div className="text-center">
              <button
                onClick={handleProcess}
                className="bg-primary text-white rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors"
              >
                Process Images
              </button>
            </div>
          )}

          {result && (
            <ResultCard
              originalImage={result.original}
              processedImage={result.processed}
              onDownload={handleDownload}
            />
          )}
        </div>
      </div>

      {processing && <ProcessingOverlay />}
    </div>
  );
};

export default Index;