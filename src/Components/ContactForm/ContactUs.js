import * as React from "react";
import { useState } from "react";
import "./ContactUs.css"
import Parser from "html-react-parser";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export const ContactUs = ( { data }) => {
    const [name, handleName] = useState("");
    const [phone, handlePhone] = useState("");
    const [email, handleEmail] = useState("");
    const [date, handleDate] = useState("");
    const [comment, handleComment] = useState("");
    const [checkbox, handleCheckbox] = useState(false);

    const inputValues = {
        name,
        phone,
        email,
        appointment_date: date,
        comment,
        checkbox
    };

    function onInputChange(e) {
        switch (e.target.name) {
            case "name": handleName(e.target.value); break;
            case "phone": handlePhone(e.target.value); break;
            case "email": handleEmail(e.target.value); break;
            case "comment": handleComment(e.target.value); break;

            default: console.error('wrong event target name')
        }
    }

    function onChangeDate(date) {
        handleDate(date)
    }

    function formInput(name, value, label, isRequired) {
        const dateInputClass = name === "appointment_date" ? "inputs-block__date-input" : "";

        return (
            <label className="inputs-block__label">
                <span>{label}</span>
                {!dateInputClass
                    ? (
                        <input
                            required={isRequired}
                            name={name}
                            value={value}
                            onChange={onInputChange}
                            type="text"
                            className={`inputs-block__input contact-us-form__input ${dateInputClass}`}
                        />
                    ) : (
                        <DayPickerInput
                            component={props => (
                                <input
                                    {...props}
                                    placeholder={""}
                                    className={`inputs-block__input contact-us-form__input ${dateInputClass}`} />
                            )}
                            onDayChange={onChangeDate}
                            dayPickerProps={{
                                month: new Date(),
                                todayButton: "Today",
                            }}
                        />
                    )
                }
            </label>
        )
    }

    function handleCheck() {
        handleCheckbox(!checkbox)
    }

    return (
        <form action="" className="contact-us-form">
            <h2 className="contact-us-form__title">{data.title}</h2>
            <div className="inputs-block">
                {
                    data.fields.map((field, index) => {
                        if (field.type !== "textarea" && field.type !== "checkbox" ) {
                            return (
                                <React.Fragment key={index}>
                                    {formInput(field.name, inputValues[field.type], field.label, field.required)}
                                </React.Fragment>
                            )
                        }
                    })
                }
            </div>

            {data.fields.map((field, index) => {
                if(field.type === "textarea") {
                    return (
                        <label key={index} htmlFor="" className="textarea-label">
                            <span>{field.label} (не обязательно)</span>
                            <textarea
                                name={field.name}
                                value={inputValues[field.type]}
                                onChange={onInputChange}
                                className="textarea-label__textarea contact-us-form__input"
                            />
                        </label>
                    )
                } else if(field.type === "checkbox") {
                    return (
                        <label key={index} htmlFor="" className="checkbox-label" onClick={handleCheck}>
                            <input
                                name={field.type}
                                onChange={onInputChange}
                                checked={inputValues[field.type]}
                                type={field.type}
                                className="checkbox-label__checkbox"
                            />
                            <span className="checkbox-label__checkmark" />
                            {Parser(field.label)}
                        </label>
                    )
                }
            })}
            <button className="contact-us-form__button">
                Отправить
            </button>
        </form>
    )
};
