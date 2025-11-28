const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "2c01bbc4c270b1cccbc86976a0f5f0e8",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;