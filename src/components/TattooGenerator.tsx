import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, 
  Settings, 
  Sparkles, 
  Shuffle,
} from "lucide-react";

const tattooStyles = [
  "No Style", "Ghibli", "Couple", "Creepy", "Glitch", "Paganic", "Geometric", "Authentic", "Dotwork", "Graffiti", "Horror", "Japanese"
];

const designChoices = [
  "Colorful", "Black & White"
];

const outputFormats = [
  "White paper", "Synthetic Skin Paper", "Forearm", "Hand", "Wrist", "Back", "Shoulder"
];

const aspectRatios = [
  { label: "1:1 Square", value: "square" },
  { label: "9:16 Portrait", value: "portrait" },
  { label: "16:9 Landscape", value: "landscape" },
];

export const TattooGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [showDesignChoices, setShowDesignChoices] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Colorful");
  const [selectedFormat, setSelectedFormat] = useState("White paper");
  const [selectedAspect, setSelectedAspect] = useState("square");
  const [selectedStyle, setSelectedStyle] = useState("No Style");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSurpriseMe = () => {
    setPrompt("A geometric wolf with glitch effects");
    setSelectedColor("Colorful");
    setSelectedFormat("White paper");
    setSelectedAspect("square");
    setSelectedStyle("Geometric");
    toast({
      title: "Surprise! 🎉",
      description: "Generated a random tattoo concept for you!",
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please describe your tattoo",
        description: "Enter a description of what you want to see in your tattoo.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImage("/placeholder.svg");
      setIsGenerating(false);
      toast({
        title: "Tattoo Generated! ✨",
        description: "Your AI tattoo design is ready!",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center mx-auto">
        <Card className="p-0 border-4 border-gray-100 shadow-2xl bg-transparent w-full rounded-3xl">
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-white rounded-3xl shadow-none p-8 flex flex-col gap-4 relative">
                <Textarea
                  placeholder="Type here a detailed description of what you want to see in your tattoo..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] text-base resize-none border-none bg-transparent focus:ring-0 focus:outline-none shadow-none"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSurpriseMe}
                className="absolute top-6 right-8 text-muted-foreground bg-muted px-4 py-1 rounded-full shadow-none border-none"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Surprise me!
              </Button>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={showStyle ? "default" : "outline"}
                  className="rounded-full px-4 py-1 text-base font-medium"
                  onClick={() => { setShowStyle(!showStyle); setShowDesignChoices(false); }}
                >
                  Style
                </Button>
                <Button
                  variant={showDesignChoices ? "default" : "outline"}
                  className="rounded-full px-4 py-1 text-base font-medium"
                  onClick={() => { setShowDesignChoices(!showDesignChoices); setShowStyle(false); }}
                >
                  Design Choices
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 rounded-full px-8 py-1 text-base font-semibold bg-black text-white hover:bg-black/90 transition-all duration-300 ml-auto"
                >
                  Generate
                </Button>
              </div>
              {/* Design Choices Dropdown */}
              {showDesignChoices && (
                <div className="w-full mt-4 bg-white rounded-xl border p-4 flex flex-col gap-4">
                  <div>
                    <div className="font-medium mb-2">Select Your Tattoo Color</div>
                    <div className="flex gap-2">
                      {designChoices.map((choice) => (
                        <Button
                          key={choice}
                          variant={selectedColor === choice ? "default" : "outline"}
                          className="rounded-full px-4 py-1 text-base font-medium"
                          onClick={() => setSelectedColor(choice)}
                        >
                          {choice}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Choose Output Format</div>
                    <div className="flex gap-2 flex-wrap">
                      {outputFormats.map((format) => (
                        <Button
                          key={format}
                          variant={selectedFormat === format ? "default" : "outline"}
                          className="rounded-full px-4 py-1 text-base font-medium"
                          onClick={() => setSelectedFormat(format)}
                        >
                          {format}
                        </Button>
                      ))}
                    </div>
                </div>
                  <div>
                    <div className="font-medium mb-2">Aspect Ratio</div>
                    <div className="flex gap-2">
                      {aspectRatios.map((ar) => (
                        <Button
                          key={ar.value}
                          variant={selectedAspect === ar.value ? "default" : "outline"}
                          className="rounded-full px-4 py-1 text-base font-medium"
                          onClick={() => setSelectedAspect(ar.value)}
                    >
                          {ar.label}
                        </Button>
                  ))}
                </div>
              </div>
                </div>
              )}
              {/* Style Dropdown */}
              {showStyle && (
                <div className="w-full mt-4 bg-white rounded-xl border p-4 flex flex-col gap-4">
                  <div className="font-medium mb-2">Select Your Tattoo Style</div>
                  <div className="flex gap-2 flex-wrap">
                    {tattooStyles.map((style) => (
                      <Button
                        key={style}
                        variant={selectedStyle === style ? "default" : "outline"}
                        className="rounded-full px-4 py-1 text-base font-medium flex flex-col items-center"
                        onClick={() => setSelectedStyle(style)}
                    >
                        {/* Placeholder for style icon/image if needed */}
                        {style}
                      </Button>
                  ))}
                </div>
              </div>
                )}
            </div>
            </div>
          </Card>
        {/* Output/Results Area */}
        <div className="w-full flex flex-col items-center mt-8">
          {generatedImage && (
            <Card className="w-full p-8 flex flex-col items-center justify-center bg-white rounded-2xl shadow-md">
              <div className="w-full flex flex-col items-center">
                <img src={generatedImage} alt="Generated Tattoo" className="w-64 h-64 object-contain mb-4" />
                <div className="flex gap-4 mt-2">
                  <Button variant="outline">Download</Button>
                  <Button variant="outline">Save</Button>
                  <Button variant="outline">Share</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};