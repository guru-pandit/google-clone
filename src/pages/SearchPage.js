import React from "react";
import { useStateValue } from "../hooks/StateProvider";
import useGoogleSearch from "../hooks/useGoogleSearch";
import "./SearchPage.css";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  // Live API call
  const { data } = useGoogleSearch(term);

  return (
    <div className="searchPage">
      <div className="searchPage-header">
        <Link to="/">
          <img
            className="searchPage-logo"
            src="images/google_logo.svg"
            alt="Google Logo"
          />
        </Link>
        <div className="searchPage-headerBody">
          <Search hideButtons />

          <div className="searchPage-options">
            <div className="searchPage-optionsLeft">
              <div className="searchPage-option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage-option">
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage-option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage-option">
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage-option">
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage-option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage-optionsRight">
              <div className="searchPage-option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage-option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage-results">
          <p className="searchPage-resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime}
            seconds) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="searchPage-result">
              <div className="searchPage-resultLink">
                <a className="searchPage-resultTitle" href={item.link}>
                  {item.pagemap?.cse_image?.length > 0 &&
                    item.pagemap?.cse_image[0]?.src && (
                      <img
                        className="searchPage-resultImage"
                        src={item.pagemap?.cse_image[0]?.src}
                        alt={term}
                      />
                    )}
                  {item.displayLink}
                </a>
                <a href={item.link}>
                  <h2>{item.title}</h2>
                </a>
              </div>
              <p className="searchPage-resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
