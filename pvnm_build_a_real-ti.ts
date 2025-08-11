interface GamePrototype {
  id: string;
  name: string;
  description: string;
  gameId: string;
  playerId: string;
  gameplayState: {
    score: number;
    lives: number;
    level: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface GameEvent {
  type: 'UPDATE_SCORE' | 'UPDATE_LIVES' | 'UPDATE_LEVEL';
  data: {
    score?: number;
    lives?: number;
    level?: number;
  };
}

interface DashboardData {
  gamePrototypes: GamePrototype[];
  gameEvents: GameEvent[];
}

interface APIResponse<T> {
  data: T;
  error: string | null;
}

class RealTimeGamePrototypeDashboard {
  private readonly apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  async getDashboardData(): Promise<APIResponse<DashboardData>> {
    const response = await fetch(`${this.apiEndpoint}/dashboard`);
    const data = await response.json();
    return { data, error: null };
  }

  async createGamePrototype(gamePrototype: GamePrototype): Promise<APIResponse<GamePrototype>> {
    const response = await fetch(`${this.apiEndpoint}/game-prototypes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gamePrototype),
    });
    const data = await response.json();
    return { data, error: null };
  }

  async updateGamePrototype(gamePrototypeId: string, updates: Partial<GamePrototype>): Promise<APIResponse<GamePrototype>> {
    const response = await fetch(`${this.apiEndpoint}/game-prototypes/${gamePrototypeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return { data, error: null };
  }

  async emitGameEvent(gamePrototypeId: string, gameEvent: GameEvent): Promise<APIResponse<GameEvent>> {
    const response = await fetch(`${this.apiEndpoint}/game-prototypes/${gamePrototypeId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameEvent),
    });
    const data = await response.json();
    return { data, error: null };
  }
}

export { RealTimeGamePrototypeDashboard };