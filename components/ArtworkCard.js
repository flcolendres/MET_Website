import { useSWR } from "swr"
import Link from "next/link";
import { Card } from "react-bootstrap";
import Error from "next/error";
export default function ArtworkCard(objectID){
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/objectID${objectID}`, fetcher)

    if (data){
        return(
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data.primarySmallImage ? data.primarySmallImage : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date</strong>: {data.objectDate ? data.objectDate : 'N/A'} 
                            <strong>Classification</strong>: {data.classification ? data.classification : 'N/A'}
                            <strong>Medium</strong>: {data.medium ? data.medium : 'N/A'}
                        </Card.Text>
                        <Link passHref={`/artwork/${data.objectID}`}><Button variant="primary"><strong>ID: x</strong>{data.objectID}</Button></Link>
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
export function ArtworkCardDetail(objectID){
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/objectID${objectID}`, fetcher)

    if (data){
        return(
            <>
                <Card>
                    {data.primaryImage && <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />}
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date</strong>: {data.objectDate ? data.objectDate : 'N/A'} <br/>
                            <strong>Classification</strong>: {data.classification ? data.classification : 'N/A'} <br />
                            <strong>Medium</strong>: {data.medium ? data.medium : 'N/A'}  <br />
                            <br /> <br />
                            <strong>Artist</strong>: {data.artistDisplayName ? data.artistDisplayName : 'N/A'} {data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}  <br />
                            <strong>Credit Line</strong>: {data.creditLine ? data.creditLine : 'N/A'} <br />
                            <strong>Dimensions</strong>: {data.dimensions ? data.dimensions : 'N/A'} <br />
                        </Card.Text>
                        <Link passHref={`/artwork/${data.objectID}`}><Button variant="primary"><strong>ID: </strong>{objectID}</Button></Link>
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