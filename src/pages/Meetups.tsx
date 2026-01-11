import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plus,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Meetup {
  id: string;
  title: string;
  description: string;
  skill: string;
  date: string;
  time: string;
  location: string;
  city: string;
  host: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees: number;
  isRsvped: boolean;
}

const mockMeetups: Meetup[] = [
  {
    id: "1",
    title: "React & TypeScript Workshop",
    description: "Learn advanced React patterns and TypeScript integration in this hands-on workshop.",
    skill: "React",
    date: "Jan 18, 2026",
    time: "3:00 PM",
    location: "Koramangala Co-working Hub",
    city: "Bangalore",
    host: { name: "Arjun Mehta", avatar: "" },
    attendees: 12,
    maxAttendees: 20,
    isRsvped: false,
  },
  {
    id: "2",
    title: "UI/UX Design Critique Session",
    description: "Bring your designs for feedback from the community. All skill levels welcome!",
    skill: "UI/UX Design",
    date: "Jan 20, 2026",
    time: "5:00 PM",
    location: "Design Studio, Indiranagar",
    city: "Bangalore",
    host: { name: "Priya Sharma", avatar: "" },
    attendees: 8,
    maxAttendees: 15,
    isRsvped: true,
  },
  {
    id: "3",
    title: "Python for Data Science Beginners",
    description: "Introduction to Python libraries like Pandas and NumPy for data analysis.",
    skill: "Python",
    date: "Jan 22, 2026",
    time: "11:00 AM",
    location: "Tech Park, Whitefield",
    city: "Bangalore",
    host: { name: "Rahul Verma", avatar: "" },
    attendees: 18,
    maxAttendees: 25,
    isRsvped: false,
  },
  {
    id: "4",
    title: "Photography Walk: Street Photography",
    description: "Explore the streets of Mumbai and learn composition techniques on the go.",
    skill: "Photography",
    date: "Jan 25, 2026",
    time: "7:00 AM",
    location: "Marine Drive",
    city: "Mumbai",
    host: { name: "Ananya Desai", avatar: "" },
    attendees: 6,
    maxAttendees: 10,
    isRsvped: false,
  },
];

const cities = ["All Cities", "Bangalore", "Mumbai", "Delhi", "Hyderabad"];

export default function Meetups() {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [meetups, setMeetups] = useState(mockMeetups);

  const filteredMeetups = selectedCity === "All Cities" 
    ? meetups 
    : meetups.filter(m => m.city === selectedCity);

  const handleRsvp = (meetupId: string) => {
    setMeetups(prev => prev.map(m => 
      m.id === meetupId 
        ? { ...m, isRsvped: !m.isRsvped, attendees: m.isRsvped ? m.attendees - 1 : m.attendees + 1 }
        : m
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navigation />

      <main className="container pt-20 md:pt-24 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Community Meetups
            </h1>
            <p className="text-muted-foreground mt-1">
              Join local skill-sharing events near you
            </p>
          </div>
          <Button variant="hero" size="sm" className="hidden md:flex gap-2">
            <Plus className="w-4 h-4" />
            Host Meetup
          </Button>
        </div>

        {/* City Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {cities.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(city)}
              className={cn(
                "whitespace-nowrap",
                selectedCity === city && "bg-primary/10 text-primary border-primary/20"
              )}
            >
              {city}
            </Button>
          ))}
        </div>

        {/* Meetups List */}
        <div className="grid gap-4">
          {filteredMeetups.map((meetup) => (
            <div
              key={meetup.id}
              className="bg-card rounded-2xl border border-border p-4 md:p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary border-0">
                        {meetup.skill}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground">
                        {meetup.title}
                      </h3>
                    </div>
                    {meetup.isRsvped && (
                      <Badge className="bg-green-100 text-green-700 border-0">
                        Going
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {meetup.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{meetup.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{meetup.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="truncate">{meetup.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{meetup.attendees}/{meetup.maxAttendees}</span>
                    </div>
                  </div>
                </div>

                {/* Host & Action */}
                <div className="flex md:flex-col items-center justify-between md:justify-start gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={meetup.host.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {meetup.host.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Hosted by</p>
                      <p className="font-medium text-foreground">{meetup.host.name}</p>
                    </div>
                  </div>

                  <Button
                    variant={meetup.isRsvped ? "outline" : "hero"}
                    size="sm"
                    onClick={() => handleRsvp(meetup.id)}
                    className="w-full md:w-auto"
                  >
                    {meetup.isRsvped ? "Cancel RSVP" : "RSVP"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredMeetups.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No meetups in {selectedCity} yet</p>
              <Button variant="link" className="text-primary mt-2">
                Be the first to host one!
              </Button>
            </div>
          )}
        </div>

        {/* Mobile FAB */}
        <Button
          variant="hero"
          size="icon"
          className="md:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>
    </div>
  );
}
