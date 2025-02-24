import React from 'react';
import { Calendar } from 'lucide-react';

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "ESL Pro League Season 19",
      game: "CS:GO",
      date: "March 15, 2024",
      prizePool: "$1,000,000",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: 2,
      title: "Valorant Champions Tour",
      game: "Valorant",
      date: "March 20, 2024",
      prizePool: "$500,000",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: 3,
      title: "LCS Spring Split Finals",
      game: "League of Legends",
      date: "March 25, 2024",
      prizePool: "$200,000",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=2070"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Upcoming Events
        </h2>
        <a href="/events" className="text-accent hover:text-accent/80 transition-colors">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-secondary rounded-lg overflow-hidden hover:ring-2 hover:ring-accent transition-all">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-secondary-foreground">
                <p>Game: {event.game}</p>
                <p>Date: {event.date}</p>
                <p>Prize Pool: {event.prizePool}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}