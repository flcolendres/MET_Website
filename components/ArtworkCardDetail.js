import  useSWR  from "swr"
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from '@/store';
import { Button, Card } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import Error from "next/error";
export default function ArtworkCardDetail(props){
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error} = useSWR(props.id ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}` : null, fetcher)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    async function favouritesClicked(){
        if(showAdded){
            // setFavouritesList(current => current.filter(fav => fav != props.id));
            // setFavouritesList(await removeFromFavourites(current => current.filter(fav => fav != props.id))) 
            setFavouritesList(await removeFromFavourites(current => current.filter(props.id))) 
            setShowAdded(false);
            console.log(`${favouritesList} removed`);
        }
        else{
            // setFavouritesList(current => [...current,  props.id]);
            // setFavouritesList(await addToFavourites(current => [...current,  props.id])) 
            setFavouritesList(await addToFavourites(props.id)) 
            setShowAdded(true);
        }
    }
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
       }, [favouritesList])       
    if (data){
        return(
            <>
                <Card>
                    <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date</strong>: {data.objectDate ? data.objectDate : 'N/A'} <br/>
                            <strong>Classification</strong>: {data.classification ? data.classification : 'N/A'} <br />
                            <strong>Medium</strong>: {data.medium ? data.medium : 'N/A'}  <br />
                            <br /> <br />
                            <strong>Artist</strong>: {data.artistDisplayName ? data.artistDisplayName : 'N/A'} {data.artistDisplayName && <> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>) </> }  <br />
                            <strong>Credit Line</strong>: {data.creditLine ? data.creditLine : 'N/A'} <br />
                            <strong>Dimensions</strong>: {data.dimensions ? data.dimensions : 'N/A'} <br />
                            <br />
                            <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}> {showAdded ? '+ Favourite (added)' : '+ Favourite'} </Button>
                        </Card.Text>
                        {/* <Link passHref={`/artwork/${data?.objectID}`}><Button variant="primary"><strong>ID: </strong>{objectID}</Button></Link> */}
                    </Card.Body>
                </Card>
            </>
        )
    }
    else if(error) {
        return(<Error statusCode={404}/>)
    }
    else{
        return null;
    }
}