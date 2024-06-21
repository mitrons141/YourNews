import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <h1 className="fixed w-screen flex items-center justify-between p-10 bg-slate-100 mb-10 drop-shadow-md text-2xl font-bold">Favorite Articles</h1>
      <div className="container mx-auto p-4">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-40">
            You have no favorite articles added.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-40">
            {favorites.map((article, index) => (
              <div key={index} className="border rounded shadow p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-2"
                  />
                )}
                <p>{article.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={article.url}
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </a>
                  <img
                    src="./minus.png"
                    alt="remove"
                    onClick={() => handleRemoveFavorite(index)}
                    className="rounded mt-2 ml-2 mr-2 w-6 h-6 cursor-pointer hover:drop-shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
