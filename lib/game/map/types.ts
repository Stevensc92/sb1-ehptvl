export type LocationType = 'village' | 'forest' | 'mountain' | 'desert' | 'lake';
export type EventType = 'battle' | 'treasure' | 'merchant' | 'ambush' | 'training';

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  description: string;
  x: number;
  y: number;
  requiredLevel?: number;
  connections: string[];
  missions?: string[];
  resources?: string[];
  explored?: boolean;
}

export interface MapEvent {
  id: string;
  type: EventType;
  name: string;
  description: string;
  locationId: string;
  duration: number; // en minutes
  rewards?: {
    experience?: number;
    items?: string[];
    coins?: number;
  };
}

export interface WorldMap {
  locations: MapLocation[];
  currentLocation: string;
  unlockedLocations: string[];
  exploredLocations: string[];
  activeEvents: MapEvent[];
}