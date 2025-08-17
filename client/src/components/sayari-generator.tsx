
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Sun, Music, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { 
    name: "Romantic", 
    icon: Heart, 
    color: "bg-pink-500", 
    description: "Dil ki baat" 
  },
  { 
    name: "Happy", 
    icon: Sun, 
    color: "bg-yellow-500", 
    description: "Khushi bharpur" 
  },
  { 
    name: "Motivational", 
    icon: Sparkles, 
    color: "bg-blue-500", 
    description: "Hausla afzai" 
  },
  { 
    name: "Friendship", 
    icon: Coffee, 
    color: "bg-green-500", 
    description: "Dosti ki mithaas" 
  },
  { 
    name: "Life", 
    icon: Music, 
    color: "bg-purple-500", 
    description: "Zindagi ke rang" 
  }
];

const vivaanSayaris = [
  {
    text: "Vivaan bhai ka style hai nyara, Har dil mein basa hai pyara, Birthday pe mile khushiyan hazaara, Tu hai sabka sitara! ✨",
    mood: "Happy"
  },
  {
    text: "Coding mein expert, dosti mein perfect, Vivaan bhai tu hai bilkul correct, Birthday ki party ho rahi select! 🎉",
    mood: "Friendship"
  },
  {
    text: "August 18 ka din hai special, Vivaan bhai ka birthday hai essential, Tere jaisa friend hai exceptional! 🎂",
    mood: "Motivational"
  },
  {
    text: "Hasna hasaana tera passion, Dost banane ka hai fashion, Happy birthday with full emotion! 💝",
    mood: "Life"
  },
  {
    text: "Tera smile dekh ke dil khush ho jaye, Vivaan bhai tera birthday celebrate ho jaye, Saal bhar khushiyan tere paas aaye! 🌟",
    mood: "Romantic"
  }
];

export function SayariGenerator() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [generatedSayari, setGeneratedSayari] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSayari = async () => {
    if (!selectedMood) {
      toast({
        title: "Mood Select Karo! 🎭",
        description: "Pehle koi mood select kariye, phir sayari generate hogi!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // First try to get from Vivaan's authentic sayaris
      const vivaanSayari = vivaanSayaris.find(s => s.mood === selectedMood);
      if (vivaanSayari) {
        setGeneratedSayari(vivaanSayari.text);
        toast({
          title: "Vivaan Bhai ki Special Sayari! 🎯",
          description: "Yeh authentic sayari specially Vivaan bhai ke liye likhi gayi hai!"
        });
        setIsGenerating(false);
        return;
      }

      // Fallback to AI generation
      const response = await fetch('/api/generate-sayari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mood: selectedMood,
          occasion: "birthday",
          name: "Vivaan Bhai"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate sayari');
      }

      const data = await response.json();
      setGeneratedSayari(data.sayari);
      
      toast({
        title: "AI Sayari Generated! 🤖",
        description: "Nahi sayari ready ho gayi hai aapke liye!"
      });

    } catch (error) {
      // Ultimate fallback with pre-written sayaris
      const fallbackSayaris = [
        "Vivaan bhai ka birthday hai aaj, Khushi mein jhoom raha hai samaaj, Tera smile dekh ke dil ho jaye raaj! 🎉",
        "Coding ka master, dosti ka champion, Vivaan bhai tu hai number one! Happy birthday mere dear friend! 🎂",
        "August mein aaya ek sitara, Vivaan bhai ka birthday hai pyara, Saal bhar rahe tu sabse nyara! ✨",
        "Hasna hasaana tera style hai bhai, Friendship mein tu hai number one guy, Happy birthday, party time hai aaj! 🥳"
      ];
      
      const randomSayari = fallbackSayaris[Math.floor(Math.random() * fallbackSayaris.length)];
      setGeneratedSayari(randomSayari);
      
      toast({
        title: "Special Sayari Ready! 💫",
        description: "Ek beautiful sayari aapke liye taiyaar hai!"
      });
    }

    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedSayari);
      toast({
        title: "Copy Ho Gaya! 📋",
        description: "Sayari clipboard mein copy ho gayi hai!"
      });
    } catch (error) {
      toast({
        title: "Copy Nahi Hua 😔",
        description: "Manually select kar ke copy karo sayari ko!",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-16 paisley-bg" data-testid="sayari-generator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gradient mb-4">
            🎭 AI Sayari Generator
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Apne mood ke hisaab se Vivaan Bhai ke liye special sayari generate karo!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-neon-cyan/30 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-neon-cyan">
                Choose Your Mood 🎨
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Konse type ki sayari chahiye? Mood select karo!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {moods.map((mood) => {
                  const IconComponent = mood.icon;
                  return (
                    <Button
                      key={mood.name}
                      variant={selectedMood === mood.name ? "default" : "outline"}
                      className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                        selectedMood === mood.name 
                          ? `${mood.color} text-white shadow-lg transform scale-105` 
                          : "glass-card hover:scale-105"
                      }`}
                      onClick={() => setSelectedMood(mood.name)}
                      data-testid={`mood-${mood.name.toLowerCase()}`}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="font-semibold text-sm">{mood.name}</span>
                      <span className="text-xs opacity-80">{mood.description}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="text-center mb-6">
                <Button
                  onClick={generateSayari}
                  disabled={isGenerating || !selectedMood}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="generate-sayari-btn"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="animate-spin h-5 w-5 mr-2" />
                      Sayari Ban Rahi Hai...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Sayari ✨
                    </>
                  )}
                </Button>
              </div>

              {generatedSayari && (
                <Card className="glass-card border-neon-gold/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-center text-neon-gold flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Generated Sayari
                      <Sparkles className="h-5 w-5" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <Badge variant="secondary" className="mb-4">
                        {selectedMood} Mood
                      </Badge>
                      <p 
                        className="text-lg md:text-xl leading-relaxed text-gray-100 font-hinglish italic"
                        data-testid="generated-sayari-text"
                      >
                        "{generatedSayari}"
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="glass-card hover:bg-neon-cyan/20"
                        data-testid="copy-sayari-btn"
                      >
                        📋 Copy Sayari
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default SayariGenerator;
