// react imports & firestore
import React, {useEffect} from "react";
import { useLocation} from "react-router-dom";
import { toast } from "react-toastify";
import { Firestore } from "authReactH/Firestore";
// import "./Search.css";

// - logic works fine, once search is hit with specific value will navigate to /search, but still got some issues for DB retrieve
const Search = () => {
    const { searchDocument, response } = Firestore("activities");

    const useQuery = () => {
        // extract value name from url
        return new URLSearchParams(useLocation().search);

    }
    let querry = useQuery();
    let search = querry.get("name");
    console.log("search 1:", search);

    useEffect(() => {
        // searchData();
        searchDocument(search);
    }, [search]) 
    if (response.error) {
        return toast.error(response.error);
      }
      toast.success("Your search completed with success");
    return (
        <div>
<h2>Search</h2>
        </div>
    )
}

export default Search;