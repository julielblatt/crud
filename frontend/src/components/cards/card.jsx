import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        priority={props.priority}
        time={props.time}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div
        className={`card-container ${props.priorityClass}`} 
        onClick={() => setOpen(true)}
      >
        <h1 className="card-title">{props.name}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-priority">Prioridade: {props.priority}</p>
        <h3 className="card-time">Horario: {props.time}</h3>
      </div>
    </div>
  );
}
