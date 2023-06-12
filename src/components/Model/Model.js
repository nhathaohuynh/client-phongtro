import React, { memo, useEffect, useRef, useState } from "react";
import { icons } from "../../utils/icons";
import { getCodes } from "../../utils/order";
import "./model.scss";
const { RiCloseFill } = icons;
const Model = ({ name, setModel, data, title, handlesubmit, select }) => {
  const [firstInput, setFirstInput] = useState(select[name]?.firstInput || 0);
  const [secondInput, setSecondInput] = useState(
    select[name]?.secondInput || 100
  );
  const trackActiveRef = useRef();
  const thumbRef = useRef();
  const [activeQuickChose, setActiveQuickChose] = useState(-1);
  const handleCloseModel = (e) => {
    e.stopPropagation();
    setModel(true);
  };

  useEffect(() => {
    if (trackActiveRef.current) {
      if (secondInput <= firstInput) {
        trackActiveRef.current.style.left = `${secondInput}%`;
        trackActiveRef.current.style.right = `${100 - firstInput}%`;
      } else {
        trackActiveRef.current.style.left = `${firstInput}%`;
        trackActiveRef.current.style.right = `${100 - secondInput}%`;
      }
    }
  }, [firstInput, secondInput]);

  const handleClickRangePrice = (e) => {
    const widthTrack = thumbRef.current.getBoundingClientRect().width;
    const trackLeft = thumbRef.current.getBoundingClientRect().left;
    const trackX = e.clientX - trackLeft;
    const percent = Math.round((trackX * 100) / widthTrack);

    if (Math.abs(percent - secondInput) >= Math.abs(percent - firstInput)) {
      setFirstInput(percent);
    } else {
      setSecondInput(percent);
    }
  };
  const convertPercentToTarget = (percent) => {
    if (name === "price") {
      return (Math.round((percent * 15) / 50) * 50) / 100;
    }
    return Math.round((percent * 90) / 100);
  };

  const convertTargetToPercent = (price) => {
    const target = name === "price" ? 15 : 90;
    return Math.round((price * 100) / target);
  };

  const handleClickQuickChose = (index, text) => {
    setActiveQuickChose(index);
    let arrayNumber = [];

    if (name === "price") {
      arrayNumber = text.split(" ").filter((item) => !!+item);
    } else {
      const arraySplit = text
        .split(" ")
        .filter((item) => item.match(/\d/g))
        .map((item) => item.split(""))
        .flat();

      arrayNumber = arraySplit
        .map((item) => !!+item && `${item}0`)
        .filter((i) => !!i);
    }

    if (arrayNumber.length === 2) {
      const [min, max] = arrayNumber;
      setFirstInput(convertTargetToPercent(+min));
      setSecondInput(convertTargetToPercent(+max));
    } else {
      const [number] = arrayNumber;
      const target = name === "price" ? 15 : 90;

      if (+number === target) {
        setFirstInput(convertTargetToPercent(target));
        setSecondInput(convertTargetToPercent(target));
      } else {
        setFirstInput(convertTargetToPercent(0));
        setSecondInput(convertTargetToPercent(+number));
      }
    }
  };

  const handleClickAgreement = (e) => {
    const codes = getCodes(
      [
        convertPercentToTarget(
          firstInput < secondInput ? firstInput : secondInput
        ),
        convertPercentToTarget(
          firstInput < secondInput ? secondInput : firstInput
        ),
      ],
      data,
      name
    );
    const query = {
      [name]: {
        value:
          firstInput === 100 && secondInput === 100
            ? convertPercentToTarget(firstInput) +
              `+ ${name === "price" ? " triệu" : " m²"}`
            : (firstInput <= secondInput
                ? convertPercentToTarget(firstInput)
                : convertPercentToTarget(secondInput)) +
              " - " +
              (firstInput <= secondInput
                ? convertPercentToTarget(secondInput)
                : convertPercentToTarget(firstInput)) +
              `${name === "price" ? " triệu" : " m²"}`,
        code: codes,
        firstInput,
        secondInput,
      },
    };

    handlesubmit(e, query);
  };

  return (
    <div className="model" onClick={() => setModel(false)}>
      <div className="model_wrapper" onClick={handleCloseModel}>
        <div className="model_header">
          <span
            className="model_close"
            onClick={(e) => {
              e.stopPropagation();
              setModel(false);
            }}
          >
            {RiCloseFill}
          </span>
          <h4>{title}</h4>
        </div>
        {(name === "price" || name === "area") && (
          <div className="model_range">
            <div className="model_price">
              {firstInput === 100 && secondInput === 100
                ? convertPercentToTarget(firstInput) +
                  `+ ${name === "price" ? " triệu" : " m²"}`
                : (firstInput <= secondInput
                    ? convertPercentToTarget(firstInput)
                    : convertPercentToTarget(secondInput)) +
                  " - " +
                  (firstInput <= secondInput
                    ? convertPercentToTarget(secondInput)
                    : convertPercentToTarget(firstInput)) +
                  `${name === "price" ? " triệu" : " m²"}`}
            </div>
            <div
              ref={thumbRef}
              className="line"
              onClick={handleClickRangePrice}
            ></div>
            <div
              className="line_track"
              ref={trackActiveRef}
              onClick={handleClickRangePrice}
            ></div>
            <input
              type="range"
              className="model_input"
              max="100"
              min="0"
              step="1"
              value={firstInput}
              onChange={(e) => setFirstInput(+e.target.value)}
            />
            <input
              type="range"
              className="model_input"
              max="100"
              min="0"
              step="1"
              value={secondInput}
              onChange={(e) => setSecondInput(+e.target.value)}
            />
            <div className="model_value">
              <span className="min" onClick={() => setFirstInput(0)}>
                0
              </span>
              <span className="max" onClick={() => setSecondInput(100)}>
                {name === "price" ? 15 : 90}
              </span>
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && (
          <h4 className="model_quickChose">Chọn nhanh</h4>
        )}
        <div
          className={`${
            name === "area" || name === "price" ? "model_row" : "model_column"
          }`}
        >
          {data.length &&
            data?.map((item, index) => {
              if (name === "area" || name === "price") {
                return (
                  <span
                    key={crypto.randomUUID()}
                    className={`model_single ${
                      activeQuickChose === index && "single_active"
                    }`}
                    onClick={() => handleClickQuickChose(index, item.value)}
                  >
                    {item.value}
                  </span>
                );
              }
              return (
                <div
                  className="model_item"
                  key={crypto.randomUUID()}
                  onClick={(e) =>
                    handlesubmit(e, {
                      [name]: { value: item.value, code: item.code },
                    })
                  }
                >
                  <input
                    type="radio"
                    name={name}
                    id={item?.code}
                    defaultChecked={item.code === select[name]?.code}
                  />
                  <label htmlFor={item?.code}>{item?.value}</label>
                </div>
              );
            })}
        </div>
        {(name === "price" || name === "area") && (
          <div className="model_footer" onClick={handleClickAgreement}>
            Áp dụng
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Model);
