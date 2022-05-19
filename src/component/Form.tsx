import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export type MessageLayer1Type = {
  id: number | null;
  type: string | null;
  fromLocation: string | null;
} | null;
export type MessageLayer2Type = {
  id: number | null;
  type: string | null;
  toLocation: string | null;
} | null;
export type MessageLayer3Type = {
  id: number | null;
  type: string | null;
  cargoType: string | null;
  cargoAmount: number | null;
} | null;
export type MessageType = {
  layer1: MessageLayer1Type;
  layer2: MessageLayer2Type;
  layer3: MessageLayer3Type;
} | null;
export type requestType = {
  id: number | null;
  fromLocation: string | null;
  toLocation: string | null;
  cargoType: string | null;
  cargoAmount: number | null;
} | null;

const Form = () => {
  const [from, setFrom] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [cargoType, setCargoType] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [id, setId] = useState<number>(1);
  const [message, setMess] = useState<MessageType>(null);
  const [layer1, setLayer1] = useState<MessageLayer1Type>(null);
  const [layer2, setLayer2] = useState<MessageLayer2Type>(null);
  const [layer3, setLayer3] = useState<MessageLayer3Type>(null);
  const [requestObj, setRequestObj] = useState<requestType>(null);
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Fired")
    createMessage();
    sendPostRequest();
  };

  useEffect(() => {
    if (dest && from && cargoType && amount) {
      setLayer1({ id: id, type: "from", fromLocation: from });
      setLayer2({ id: id, type: "to", toLocation: dest });
      setLayer3({
        id: id,
        type: "cargo",
        cargoType: cargoType,
        cargoAmount: amount,
      });
    } else {
      setLayer1(null);
      setLayer2(null);
      setLayer3(null);
    }
  }, [id, from, dest, cargoType, amount]);

  useEffect(() => {
    if (layer1 && layer2 && layer3) {
      setMess({ layer1: layer1, layer2: layer2, layer3: layer3 });
    } else {
      setMess(null);
    }
  }, [layer1, layer2, layer3]);

  useEffect(() => {
    if (!message?.layer1 || !message?.layer2 || !message?.layer3) {
      setRequestObj(null);
    } else {
      console.log(message);
      setRequestObj({
        id: message.layer1!.id,
        fromLocation: message.layer1.fromLocation,
        toLocation: message.layer2!.toLocation,
        cargoType: message.layer3!.cargoType,
        cargoAmount: message.layer3!.cargoAmount,
      });
    }
  }, [message]);

  const createMessage = () => {
    setMess({ layer1: layer1, layer2: layer2, layer3: layer3 });
    console.log(message);
  };

  const sendPostRequest = async () => {
    if (message) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log(requestObj);
        const { data } = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          requestObj,
          config
        );
        console.log("success");
      } catch (e) {
        console.log("error");
      }
    } else {
      console.log("Message does not contain enough information.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        From Location:
        <input
          required={true}
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        To Location:
        <input
          required={true}
          type="text"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        Cargo Type:
        <input
          required={true}
          type="text"
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        Amount:
        <input
          required={true}
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </label>
      <p></p>
      <input type="submit" />
    </form>
  );
};

export default Form;
