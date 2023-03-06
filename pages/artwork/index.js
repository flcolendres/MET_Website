import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSWR } from 'swr'
import Error from "next/error";
import { Row, Card, Col } from "react-bootstrap";
export default function Artwork(){ 
    const PER_PAGE = 12;
    const {page, setPage} = useState(1)
    const {artworkList, setArtworkList} = useState()
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher)
    function previousPage(){
        if (page > 1)
            setPage(page - 1);
    }
    function nextPage(){
        if (page < artworkList.length)
            setPage(page + 1);
    }
    useEffect(() => {
        if(data){
            results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }            
            setArtworkList(results);   
            setPage(page + 1);
        }
        if(error)
            <Error statusCode={404} />
    }, [data]);
    if (artworkList){
        <Row className="gy-4">
            {artworkList.length > 0 && artworkList[page - 1].map((elem) => (<Col lg={3} key={elem}><ArtworkCard objectID={elem} /></Col>))}
            {artworkList.length == 0 && 
                <Card><Card.Body><h4>Nothing Here</h4></Card.Body></Card>
            }
        </Row>
        {artworkList.length > 0 && 
        <Pagination>
            <Pagination.Prev onClick={previousPage}/>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
        </Pagination>
        }
    }
    else {
        null
    }

    return(
        <>
       {artworkList ? 
            <Row className="gy-4">
                {artworkList.length > 0 && artworkList[page - 1].map((elem) => (<Col lg={3} key={elem}><ArtworkCard objectID={elem} /></Col>))}
                {artworkList.length == 0 && 
                    <Card><Card.Body><h4>Nothing Here</h4></Card.Body></Card>
                }
            </Row>
            : null
        }
        { artworkList?.length > 0 && 
            <Col>
                <Pagination>
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage}/>
                </Pagination>
            </Col>
        }
        </>
    
    )    
}