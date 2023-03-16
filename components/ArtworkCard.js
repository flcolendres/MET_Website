import useSWR  from "swr"
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
export default function ArtworkCard(props){
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher)
    if (data){
        return(
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date</strong>: {data.objectDate ? data.objectDate : 'N/A'} <br />
                            <strong>Classification</strong>: {data.classification ? data.classification : 'N/A'} <br />
                            <strong>Medium</strong>: {data.medium ? data.medium : 'N/A'} <br />
                        </Card.Text>
                        <Link href={`/artwork/${props.objectID}`} passHref><Button variant="primary"><strong>ID: </strong>{data.objectID}</Button></Link>
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
