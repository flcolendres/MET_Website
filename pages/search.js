import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
export default function search(){
    const { register, handleSubmit, formState: { isInvalid } } = useForm({
        defaultValues:{
            q: "",
            searchBy: "",
            isOnView: "",
            isHighlight: "",
        },
    });
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    function submitForm(data){        
        let queryString = '';
        queryString += `${data.searchBy}=true`
        data.geoLocation ? queryString += `&geoLocation=${data.geoLocation}` : null;
        data.medium ? queryString += `&medium=${data.medium}` : null;
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;
        setSearchHistory(current => [...current,  data])
        router.push(`/artwork/?${queryString}`);

    }

    return(

        <Container>
            <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control className={isInvalid && 'is-invalid'} type="text" placeholder="" {...register('q')}  required/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select {...register('searchBy')} className="mb-3">
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" {...register('geoLocation')} />
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" {...register('medium')}/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    {...register('isHighlight')}
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    {...register('isOnView')}
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}
