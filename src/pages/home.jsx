// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY; 
        let url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&category=${category}&language=en`;

        if (searchQuery) {
          url = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${searchQuery}&language=en`;
        }

        console.log('Fetching URL:', url);
        const response = await axios.get(url);
        setArticles(response.data.news || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Oops, something went wrong while fetching articles.");
        setArticles([]);
      }
    };

    fetchArticles();
  }, [category, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.elements.search.value);
  };

  const handleFavorite = (article) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...savedFavorites, article];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Article added to favorites");
  };

  return (
    <>
      <div className="fixed w-screen flex flex-col md:flex-row gap-6 items-center justify-between p-10 bg-slate-100 mb-10 drop-shadow-md">
        <h1 className="text-2xl font-bold mb-4 drop-shadow-lg">
          News Articles
        </h1>
        <div className="mb-4 flex gap-3">
          <select
            className="bg-slate-200 p-2 rounded-lg drop-shadow-md"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
          </select>
        </div>
        <form
          onSubmit={handleSearch}
          className="flex items-start justify-start mb-4 drop-shadow-lg"
        >
          <input
            type="text"
            name="search"
            placeholder="Search for articles..."
            className="border rounded-l-lg p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 pb-2.5 rounded-r-lg"
          >
            Search
          </button>
        </form>
        <Link
          to="/favorites"
          className="text-yellow-500 mb-4 block rounded-md border border-yellow-400 p-2 shadow-lg"
        >
          View Favorites
        </Link>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-40">
          {error ? (
            <h1 className="text-center text-gray-500 mt-40">{error}</h1>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="border rounded shadow p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-2"
                  />
                )}
                <p>{article.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <a
                    href={article.url}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                  <img
                    src="./star.png"
                    alt="add"
                    onClick={() => handleFavorite(article)}
                    className="rounded mt-2 w-8 h-8 cursor-pointer hover:drop-shadow-lg"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
