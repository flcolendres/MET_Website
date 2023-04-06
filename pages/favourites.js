import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import { Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export default function Favourites(props){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    
    return(
        <>
            {favouritesList.length > 0 ? 
                <Row className="gy-4">
                    {favouritesList.length > 0 && favouritesList.map( (current) => (
                        
                        <Col lg={3} key={current}><ArtworkCard objectID={current} /></Col>                 
                        ))}
                </Row>
                : 
                <Row className="gy-4">
                    <Card><Card.Body><h4>Nothing Here.</h4> <p>Try adding some new artwork to the list.</p></Card.Body></Card>
                </Row>
            }
        </>
    )
}