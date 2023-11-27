import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    time: "",
    priority: "",
  });
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Alta":
        return "high-priority";
      case "Media":
        return "medium-priority";
      case "Baixa":
        return "low-priority";
      default:
        return "";
    }
  };
  
  const [listCard, setListCard] = useState([]);

  const handleRegisterTask = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      time: values.time,
      priority: values.priority,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        time: values.time,
        priority: values.priority,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            time: values.time,
            priority: values.priority,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleAddValues = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Tarefas</h1>

        <input
          type="text"
          name="name"
          placeholder="O que fazer?"
          className="register-input"
          onChange={handleAddValues}
          value={values.name}
        />
        <select
          name="time"
          className="register-input"
          onChange={handleAddValues}
          defaultValue=""
        >
          <option value="" disabled>
            Que horas?
          </option>
          <option value="06:00">06:00</option>
          <option value="07:00">07:00</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
          <option value="23:00">23:00</option>
          <option value="00:00">00:00</option>
          <option value="1:00">01:00</option>
          <option value="2:00">02:00</option>
          <option value="3:00">03:00</option>
          <option value="4:00">04:00</option>
          <option value="5:00">05:00</option>
        </select>
        <select
          name="priority"
          className="register-input"
          onChange={handleAddValues}
          defaultValue=""
        >
          <option value="" disabled>
            Qual a prioridade?
          </option>
          <option value="Alta">Alta</option>
          <option value="Media">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <button onClick={handleRegisterTask} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          time={val.time}
          priority={val.priority}
          priorityClass={getPriorityClass(val.priority)}
        />
      ))}
    </div>
  );
  
}