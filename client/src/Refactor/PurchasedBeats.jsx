import React, { Component } from 'react';
import style from './PurchasedBeats.css'
import { Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const PurchasedBeats = ({
  beats
}) => (
    <div>
      {beats.map((beat, i) =>
        <Card className="beat-card">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBlock>
            <CardTitle>{beat.title}</CardTitle>
            <CardSubtitle>Paid {beat.price}</CardSubtitle>
            <audio>
              <source src={'https://beat-profile.herokuapp.com/api/beats/' + beat._id}/>
            </audio>
            <Button>Button</Button>
          </CardBlock>
        </Card>
      )}
    </div>
);

export default PurchasedBeats;
