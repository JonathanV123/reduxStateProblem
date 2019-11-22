import React, { useState } from 'react';
import {Button, Nav, Modal, Form, Col} from "react-bootstrap";
import {useForm} from "hooks";
import {shallowEqual, useSelector, useDispatch} from "react-redux";
import {createLead, fetchLead} from "screens/leads/actions";

const submit = value => {
};

const generatePayload = inputs => {

  inputs.phone_numbers = [
    {
      number: inputs.phone_number,
      primary: true
    }
  ];
  inputs.email_addresses = [
    {
      address: inputs.email_address,
      primary: true
    }
  ];

  delete inputs.email_address;
  delete inputs.phone_number;

  return inputs;
};

const selectedPipelineStages = (pipelines, pipeline_id) => {
  let pipeline = pipelines.find( (el, i) => el.id === pipeline_id );
  return (pipeline ? pipeline.stages : []);
};

export const CreateLead = () => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [creatingLead, setCreatingLead] = useState(false);

  const serviceProvider = useSelector( state => state.currentServiceProvider, shallowEqual );

  let {inputs, handleInputChange} = useForm(submit,{
    service_provider_id: serviceProvider.id,
    pipeline_id: null
  });

  console.log("render", serviceProvider.leads)

  const submitForm = (e) => {
    e.preventDefault();
    let payload = generatePayload(inputs);
    setCreatingLead(true);
    dispatch(createLead(payload, () => {
      setCreatingLead(false);
      handleClose();
      console.log("before settimeout", serviceProvider.leads)
      setTimeout( ()=>{
        console.log("after settimeout", serviceProvider.leads)
        //dispatch(fetchLead(serviceProvider.leads[0].id, () => {}));
      }, 2000 )
    }));
  };

  return (
    <>
      <Nav.Item>
        <Button onClick={handleShow} className={"btn btn-primary mr-3"}>New Lead</Button>
      </Nav.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitForm(e)}>
            <Form.Row>
              <Form.Group as={Col} className={"col-12"}>
                <Form.Label column={false}>First Name</Form.Label>
                <Form.Control name={"first_name"} placeholder="First name" onChange={e => handleInputChange(e)} />
              </Form.Group>
              <Form.Group as={Col} className={"col-12"}>
                <Form.Label column={false}>Last Name</Form.Label>
                <Form.Control name={"last_name"} placeholder="Last Name" onChange={e => handleInputChange(e)} />
              </Form.Group>
              <Form.Group as={Col} className={"col-12"}>
                <Form.Label column={false}>Phone Number</Form.Label>
                <Form.Control name={"phone_number"} placeholder="Phone Number" onChange={e => handleInputChange(e)} />
              </Form.Group>
              <Form.Group as={Col} className={"col-12"}>
                <Form.Label column={false}>Email Address</Form.Label>
                <Form.Control name={"email_address"} placeholder="Email Address" onChange={e => handleInputChange(e)} />
              </Form.Group>
              <Form.Group as={Col} className={"col-12"}>
                <Form.Label>Pipeline</Form.Label>
                <Form.Control name={"pipeline_id"} as="select" onChange={e => handleInputChange(e)}>
                  <option value={""}>Select Pipeline</option>
                  {
                    serviceProvider.pipelines.map( (item, i) => <option value={item.id} key={item.id}>{item.pipeline_name}</option>)
                  }
                </Form.Control>
              </Form.Group>
              {
                inputs.pipeline_id ?
                  <Form.Group as={Col} className={"col-12"}>
                    <Form.Label>Pipeline Stage:</Form.Label>
                    <Form.Control name={"pipeline_stage_id"} as="select" onChange={e => handleInputChange(e)}>
                      <option value={""}>Select Stage</option>
                      {
                        selectedPipelineStages(serviceProvider.pipelines, inputs.pipeline_id).map( (item, i) => <option value={item.id} key={item.id}>{item.pipeline_stage_name}</option>)
                      }
                    </Form.Control>
                  </Form.Group> :
                  null
              }
              <Form.Group as={Col} className={"col-12"}>
                <Button type={"submit"} variant="primary" disabled={creatingLead}>
                  Create Lead
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
};