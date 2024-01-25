export type Movie = {
  id: {
    timestamp: number;
    date: number;
  };
  imdbId: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  genres: string[];
  poster: string;
  backdrops: string[];
  reviewIds: [
    {
      id: {
        timestamp: number;
        date: number;
      };
      body: string;
    }
  ];
};

