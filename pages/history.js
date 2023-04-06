import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Card, Container} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";


export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter()
    if(!searchHistory) return null;
    let parsedHistory = [];
    searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
    });
    function historyClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        console.log(`${index} is the index`)
        router.push(`/artwork?${searchHistory[index]}`);
    }
    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        // setSearchHistory(current => {
        //  let x = [...current];
        //  x.splice(index, 1)
        //  return x;
        // });
        setSearchHistory(await removeFromHistory(searchHistory[index]))

    }
    return(
        <>
        {parsedHistory.length == 0 ? <Card><Card.Body><h4>Nothing Here.</h4> <p>Try adding some new artwork to the list.</p></Card.Body></Card> : 
            <Container>
                <ListGroup>
                    {parsedHistory.map((historyItem, index)=>(
                <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                    {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                </ListGroup.Item>
                ))}
                </ListGroup>
            </Container>
        }
        </>

    )

}

// {artworkList.length > 0 && artworkList[page - 1].map( (currentObjectID) => (
                    
//     <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
    
//     ))}
// {artworkList.length == 0 && 
//     <Card><Card.Body><h4>Nothing Here</h4></Card.Body></Card>
// }