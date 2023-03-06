import { Row, Col } from "react-bootstrap"
import { ArtworkCardDetail } from "@/components/ArtworkCard"
import { useRouter } from "next/router"
export default function ArtworkById(){
    const router = useRouter();
    const {id} = router.query;
    return(
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={id} />
                </Col>
            </Row>
        </>
    )

}