import React,{useState, useEffect} from 'react'
import { useFormik } from 'formik';

import { TOUR_FORM_SCHEMA, INITIAL_TOUR_FORM_VALUES } from './tour-form.util';
import {Container, Form, Button,Col } from 'react-bootstrap';
import useStyles from '../../../shared/styles/form.style';
import {getLocations, getCategories, getBenefits, createTour, createPicture} from '../shared/services/tour.service'
import {ITourForm, ILocation, IBenefitSelect, ICategory, IBenefit} from '../shared/model'
import MultiSelect from "react-multi-select-component";
import {ROOT} from '../../../shared/routes'

const TourForm=()=>{
    const classes = useStyles();
    const [ocategories, setOcategories]=useState([] as ICategory[]);
    const [olocations, setOlocations]=useState([] as ILocation[]);
    const [obenefits, setObenefits]=useState([] as IBenefitSelect[]);
    const [selected, setSelected] = useState<any[]>([]);
    const [files, setFiles]= useState<any[]>([]);
    const [images, setImages]= useState<any[]>([]);

    const fileSelectedHandler = (e:any) => {

        if(e.target.files){

            const fileArray=Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
            console.log(fileArray)
            console.log(e.target.files);

            setFiles((prevImages)=>prevImages.concat(fileArray));
            setImages(e.target.files);
        }
       
    }

    const renderPhotos=(source:any)=>{
        return source.map((photo:any)=>{
            return <img src={photo} key={photo} width="200" height="300"/>
        })
    }
    


    const adjustBenefitArray=(bens:IBenefit[])=>{
        const benefits:IBenefitSelect[]=[];
        for(let i=0; i<bens.length;i++){
            benefits[i]={value:bens[i].id.toString(), label:bens[i].description}
        }
        return benefits;
    };

    const loadOptions=async()=>{
        const resLoc= await getLocations();
        setOlocations(resLoc.data);
        const resCat= await getCategories();
        setOcategories(resCat.data);
        const resBen= await getBenefits();
        setObenefits(adjustBenefitArray(resBen.data));
    };


    useEffect(() => {
        loadOptions();
    }, []);

    const onSubmit = async(tour:ITourForm) => {
        tour.benefits=[];
    
        for(let i=0;i<selected.length;i++){
            tour.benefits.push(parseInt(selected[i].value));
        }
        
        await createTour(tour);

        for(let i=0;i<images.length;i++){
            const formdata= new FormData();
            formdata.append('image', images[i]);
            formdata.append('Tour', tour.id);
            await createPicture(formdata);
        }
         window.location.href=ROOT;
        
      };
  
      const { handleSubmit ,handleChange,values, errors} = useFormik<ITourForm>({
          onSubmit,
          initialValues: INITIAL_TOUR_FORM_VALUES,
          validationSchema: TOUR_FORM_SCHEMA
        });
    return (
        <Container className={classes.root}>
             <h1>Add Tour</h1>
             <br/>     
            <Form onSubmitCapture={handleSubmit}>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter ID" name="id"  value={values.id}  id={errors.id ? "error" : ""} />
                    {errors.id ? (
                            <div id="error_message">{errors.id}</div>
                        ): null}
                    </Form.Group>

               
                <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter Name" name="name"  value={values.name}  id={errors.name ? "error" : ""} />
                    {errors.name ? (
                            <div id="error_message">{errors.name}</div>
                        ): null}
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter Description" name="description"  value={values.description}  id={errors.description ? "error" : ""} />
                    {errors.description ? (
                            <div id="error_message">{errors.description}</div>
                        ): null}
                    </Form.Group>
                </Form.Row>
                <Form.Row>

                <Form.Group as={Col}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control onChange={handleChange} type="date" placeholder="Enter Date" name="start_date"  value={values.start_date}  id={errors.start_date ? "error" : ""} />
                    {errors.start_date ? (
                            <div id="error_message">{errors.start_date}</div>
                        ): null}
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter Duration" name="duration"  value={values.duration}  id={errors.duration ? "error" : ""} />
                    {errors.duration ? (
                            <div id="error_message">{errors.duration}</div>
                        ): null}
                    </Form.Group>
                  
                </Form.Row>
                <Form.Row>
                  
                <Form.Group as={Col}>
                    <Form.Label>Price for Person</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter Price for Person" name="price_for_person"  value={values.price_for_person}  id={errors.price_for_person ? "error" : ""} />
                    {errors.price_for_person ? (
                            <div id="error_message">{errors.price_for_person}</div>
                        ): null}
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Max Capacity</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter Max Capacity" name="max_capacity"  value={values.max_capacity}  id={errors.max_capacity ? "error" : ""} />
                    {errors.max_capacity ? (
                            <div id="error_message">{errors.max_capacity}</div>
                        ): null}
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" onChange={handleChange} value={values.location} name="location" id={errors.location ? "error" : ""}>

                    <option key="0" value="0">Select Location</option> 
                    {olocations.map(({id, country, city}) => (
                    <option key={id} value={id} >
                        {`${country}, ${city}`}
                    </option>
                    ))}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" onChange={handleChange} value={values.category} name="category" id={errors.category ? "error" : ""}>

                    <option key="0" value="0">Select Category</option> 
                    {ocategories.map(({id, description}) => (
                    <option key={id} value={id} >
                        {description}
                    </option>
                    ))}

                    </Form.Control>
                    </Form.Group>                 
                </Form.Row>

               
                <Form.Group>
                <Form.Label>Images(Optional)</Form.Label>
                <Form.File 
                    id="custom-file"
                    label="Custom file input"
                    custom
                    onChange={fileSelectedHandler}
                    multiple
                />
                {renderPhotos(files)}
                </Form.Group>

                <Form.Group>
                <Form.Label>Benefits(Optional)</Form.Label>
                <MultiSelect
                    options={obenefits}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
                </Form.Group>  

                <Button variant="primary" type="submit">
                    Submit
                </Button>
             </Form>
        </Container>
    )
}

export default TourForm;
