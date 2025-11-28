import React, { useCallback, useEffect, useState } from "react";

import "./movie-grid.scss";

import { useNavigate, useParams } from "react-router-dom"; // updated

import MovieCard from "./../movie-card/MovieCard";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import * as Config from "./../../constants/Config";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (!keyword) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(props.category, { params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [keyword, props.category]);

  const loadMore = async () => {
    let response = null;
    const nextPage = page + 1;

    if (!keyword) {
      const params = { page: nextPage };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = { page: nextPage, query: keyword };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems([...items, ...response.results]);
    setPage(nextPage);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate(); // updated
  const [keyword, setKeyword] = useState(props.keyword || "");

  const goToSearch = useCallback(() => {
    if (keyword.trim()) {
      navigate(`/${Config.HOME_PAGE}/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
