import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useReducer, useEffect } from 'react';
import { Chip } from "@material-ui/core";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function FieldsBox({ fieldsOptions, getSelectedFields }) {
    const initialState = { selectedOptions: [] };
    const [fieldsSearchstate, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getSelectedFields(fieldsSearchstate.selectedOptions)
    },[fieldsSearchstate])
    
    const updateSelectedFields = (event, values) => {
        dispatch({ type: "SET_SELECTED_OPTIONS", payload: { options: values } });
    };
    
    const removeSelectedField = (id) => {
        dispatch({ type: "REMOVE_OPTION", payload: { id: id } });
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={fieldsOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            value={fieldsSearchstate.selectedOptions}
            renderTags={(values) =>
                values.map((value) => {
                    return (
                        <Chip
                            key={value.id}
                            label={value.title}
                            onDelete={() => {
                                removeSelectedField(value.id)
                            }}
                        />
                    )})
            }
            getOptionSelected={(option, value) => option.id === value.id}

            onChange={updateSelectedFields}
            renderOption={(props, option, { selected }) => {
                return (<li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </li>)
            }}
            style={{ width: "100%" }}
            renderInput={(params) => (
                <TextField {...params} label="Fields" placeholder={"select a field"} />
            )}
        />
    );
}



function reducer(fieldsSearchstate, action) {
    switch (action.type) {
        case "SET_SELECTED_OPTIONS":
                return { selectedOptions: action.payload.options };

        case "REMOVE_OPTION":
            return {
                selectedOptions: fieldsSearchstate.selectedOptions.filter(
                    (option) => option.id !== action.payload.id
                )
            };
        default:
            throw new Error();
    }
}