
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { useAtom } from "jotai";
import { useEffect } from "react";
const PUBLIC_PATHS = ['/register'];


export default function RouteGuard(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }
    useEffect(()=>{
        updateAtoms()
    })

    return <>{props.children}</>
  }