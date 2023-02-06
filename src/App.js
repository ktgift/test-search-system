import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Input, Space, Card } from "antd";

const { Meta } = Card;

function App() {
  const [genders, setGenders] = useState([]);
  const [countrys, setCountrys] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [seach, setSeach] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [selectGender, setSelectGender] = useState(undefined);
  const [selectCountry, setSelectCountry] = useState(undefined);

  let data = require("./MOCK_DATA.json");

  const findGender = (data) => {
    let v = [];
    data.map((el) => {
      v.push(el.gender);
    });

    let uniqueGender = v.filter((element, index) => {
      let result = v.indexOf(element) === index;

      return result;
    });

    return uniqueGender;
  };

  const findCountry = (data) => {
    let v = [];
    data.map((el) => {
      v.push(el.country);
    });

    let uniqueCountry = v.filter((element, index) => {
      let result = v.indexOf(element) === index;

      return result;
    });

    return uniqueCountry;
  };

  useEffect(() => {
    setGenders(findGender(data));
    setCountrys(findCountry(data));
  }, []);

  const onSearch = (value) => {
    setTextSeach(value);
    const results = data.filter(
      (item) =>
        item.first_name.includes(value) || item.last_name.includes(value)
    );
    setSeach(results);
  };

  const onClear = () => {
    setTextSeach("");
    setSeach(undefined);
  };

  const selectType = () => {
    let show;
    if (selectCountry && !selectGender) {
      show = data.filter((item) => item.country.includes(selectCountry));
    } else if (selectGender && !selectCountry) {
      show = data.filter((item) => item.gender.includes(selectGender));
    } else if (selectGender && selectCountry) {
      show = data.filter(
        (item) =>
          item.gender.includes(selectGender) &&
          item.country.includes(selectCountry)
      );
    } else {
      show = undefined
    }
    return show;
  };

  useEffect(() => {
    setSeach(selectType);
  }, [selectCountry, selectGender]);

  console.log(seach)

  return (
    <div className="flex flex-col justify-center p-40">
      <div className="text-5xl m-10 flex justify-center items-center ">
        Test
      </div>
      <div className="flex flex-row flex-onwrap justify-center items-center">
        {genders.map((el, idx) => (
          <div
            key={idx}
            className="icon mx-3 mb-10"
            onClick={() => setSelectGender(el)}
          >
            {el}
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-onwrap justify-center items-center">
        {countrys.map((el, idx) => (
          <div
            key={idx}
            type="button"
            className="icon mx-3 mb-10"
            onClick={() => setSelectCountry(el)}
          >
            {el}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center mb-6">
        <Input
          style={{ width: "20%" }}
          size="large"
          placeholder="Search"
          type="text"
          value={textSeach}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="text-sky-600 ml-4" onClick={() => onClear()}>
          CLEAR
        </div>
      </div>
      <div className="flex flex-row flex-wrap ">
        {seach !== undefined
          ? seach.map((el, idx) => (
              <Card
                key={el.id}
                className="m-4 shadow-md"
                hoverable
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={el.image} height="240" />}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="text-base">
                    {el.first_name + " " + el.last_name}
                  </div>
                  <div className="text-xl">{el.gender}</div>
                  <div className="text-xl">{el.email}</div>
                  <div className="text-xl">{el.country}</div>
                </div>
              </Card>
            ))
          : data.map((el, idx) => (
              <Card
                key={el.id}
                className="m-4 "
                hoverable
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={el.image} height="240" />}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="text-base">
                    {el.first_name + " " + el.last_name}
                  </div>
                  <div className="text-xl">{el.gender}</div>
                  <div className="text-xl">{el.email}</div>
                  <div className="text-xl">{el.country}</div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}

export default App;
