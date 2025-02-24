import React from 'react';
import { Trophy } from 'lucide-react';

export function FeaturedMatch() {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
          alt="Featured match"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-sm text-accent">LIVE NOW</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Team Liquid vs. Cloud9
          </h2>
          <p className="text-secondary-foreground">
            ESL Pro League Season 19 - Grand Finals
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070"
              alt="Team Liquid"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-foreground">Team Liquid</p>
              <p className="text-sm text-secondary-foreground">Score: 1</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-accent">VS</div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-bold text-foreground">Cloud9</p>
              <p className="text-sm text-secondary-foreground">Score: 2</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1560155016-bd4879ae8f21?auto=format&fit=crop&q=80&w=2070"
              alt="Cloud9"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}