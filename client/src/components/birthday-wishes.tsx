import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { BirthdayWish } from '@shared/schema';

export function BirthdayWishes() {
  const [senderName, setSenderName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishes, isLoading } = useQuery<BirthdayWish[]>({
    queryKey: ['/api/wishes'],
  });

  const createWishMutation = useMutation({
    mutationFn: async (data: { senderName: string; message: string }) => {
      const response = await apiRequest('POST', '/api/wishes', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishes'] });
      setSenderName('');
      setWishMessage('');
      toast({
        title: "Thank you for your beautiful birthday wish! 🎉",
        description: "Vivaan Bhai will be so happy to read this!",
      });
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong",
        description: "Your wish couldn't be sent. Please try again!",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderName.trim() || !wishMessage.trim()) {
      toast({
        title: "Please fill in both fields! 😊",
        description: "We need your name and a lovely birthday message.",
        variant: "destructive",
      });
      return;
    }

    createWishMutation.mutate({
      senderName: senderName.trim(),
      message: wishMessage.trim(),
    });
  };

  const formatTimeAgo = (createdAt: Date | string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').substring(0, 2);
  };

  return (
    <section className="py-20 relative overflow-hidden" data-testid="birthday-wishes-section">
      <div className="absolute inset-0 paisley-bg opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-poppins font-bold text-gradient mb-4" data-testid="wishes-title">
            💌 Birthday Wishes
          </h2>
          <p className="text-gray-300 text-lg" data-testid="wishes-subtitle">
            Leave your heartfelt message for Vivaan Bhai!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          
          {/* Wishes Form */}
          <div className="glass-card rounded-2xl p-8 mb-8">
            <form onSubmit={handleSubmit} data-testid="wish-form">
              <div className="mb-6">
                <label className="block text-neon-cyan font-poppins mb-2" data-testid="name-label">
                  Your Name:
                </label>
                <Input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-glass-white border border-glass-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-cyan focus:outline-none transition-colors duration-300 min-h-[44px]"
                  placeholder="Enter your name..."
                  data-testid="input-sender-name"
                  maxLength={50}
                  autoComplete="name"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-neon-cyan font-poppins mb-2" data-testid="message-label">
                  Your Birthday Wish (Hinglish welcomed!):
                </label>
                <Textarea
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  className="w-full bg-glass-white border border-glass-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-cyan focus:outline-none transition-colors duration-300 min-h-[120px] resize-none"
                  placeholder="Vivaan bhai, aapki har ek sayari humari jaan hai! Happy Birthday! 🎉"
                  data-testid="input-wish-message"
                  maxLength={500}
                  rows={4}
                />
              </div>
              
              <Button
                type="submit"
                disabled={createWishMutation.isPending}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-gold text-dark-primary font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300"
                data-testid="submit-wish-button"
              >
                {createWishMutation.isPending ? "🎁 Sending Wish... 🎁" : "🎁 Send Birthday Wish 🎁"}
              </Button>
            </form>
          </div>
          
          {/* Wishes Display */}
          <div className="space-y-4">
            <h3 className="text-xl font-poppins font-semibold text-center text-neon-gold mb-6" data-testid="recent-wishes-title">
              Recent Birthday Wishes:
            </h3>
            
            {isLoading ? (
              <div className="text-center py-8" data-testid="wishes-loading">
                <p className="text-gray-400">Loading birthday wishes... 🎂</p>
              </div>
            ) : wishes && wishes.length > 0 ? (
              wishes.slice(0, 10).map((wish) => (
                <div 
                  key={wish.id}
                  className="glass-card rounded-xl p-4 hover-glow"
                  data-testid={`wish-${wish.id}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-neon-gold rounded-full flex items-center justify-center text-dark-primary font-bold" data-testid={`wish-${wish.id}-avatar`}>
                      {getInitials(wish.senderName)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-neon-cyan text-sm" data-testid={`wish-${wish.id}-name`}>
                        {wish.senderName}
                      </div>
                      <div className="text-white mt-1" data-testid={`wish-${wish.id}-message`}>
                        {wish.message}
                      </div>
                      <div className="text-xs text-gray-400 mt-2" data-testid={`wish-${wish.id}-timestamp`}>
                        {formatTimeAgo(wish.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8" data-testid="no-wishes">
                <p className="text-gray-400">Be the first to leave a birthday wish! 💝</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
