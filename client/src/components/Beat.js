import React, { Component } from 'react';
import { Button, Alert, UncontrolledAlert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';

const Beat = ({
  token,
  temp_error,
  handleClick,
  beats,
  error,
}) => (
    <div>
      {beats.map((beat,i) =>
        <div key={i}>
          {error ?
            <UncontrolledAlert color="danger">
                {error}
            </UncontrolledAlert>
          :
            null
            }
          {beat.title}
          {beat.price}
          <audio controls>
            <source src={'http://localhost:3000/api/beats/' + beat._id}/>
          </audio>

          {temp_error === 401 ?
            <Button color="primary"
              onClick={handleClick}
              >primary</Button>

            :

            <StripeCheckout
              name={beat.title}
              description="Big Data Stuff"
              token={token}
              stripeKey={process.env.StripeKey}
              amount={beat.price * 100}
              reconfigure
              currency="USD">
              <Button color="primary" >
                primary
              </Button>
              </StripeCheckout>
            }

        </div>
      )}
    </div>
);

export default Beat;
