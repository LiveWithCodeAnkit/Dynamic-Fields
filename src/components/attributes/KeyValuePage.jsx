"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";

const KeyValuePage = ({ index }) => {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `attributesCate.${index}.keyValuePairs`,
  });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const hasAppended = useRef(false);
  const handleTypeChange = (event, innerIndex) => {
    const newSelectedTypes = [...selectedTypes];
    newSelectedTypes[innerIndex] = event.target.value;
    setSelectedTypes(newSelectedTypes);
  };

  const handleAddCategory = () => {
    append({
      categoryone: "",
      categorytwo: "",
      categorythree: "",
    });
  };

  const handleRemoveCategory = (innerIndex) => {
    remove(innerIndex);
  };

  useEffect(() => {
    if (!hasAppended.current && fields.length === 0) {
      append({
        categoryone: "",
        categorytwo: "",
        categorythree: "",
      });
      hasAppended.current = true;
    }
  }, [fields, append]);

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      {fields.map((attribute, innerIndex) => (
        <div
          key={attribute.id}
          className="flex gap-2 justify-start items-center w-full"
        >
          <input
            type="text"
            {...register(
              `attributesCate.${index}.keyValuePairs.${innerIndex}.categoryone`
            )}
            id={`categoryone-${index}-${innerIndex}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Attribute Name"
          />
          <input
            type="text"
            {...register(
              `attributesCate.${index}.keyValuePairs.${innerIndex}.categorytwo`
            )}
            id={`categorytwo-${index}-${innerIndex}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Key Value"
          />

          <div>
            <select
              value={selectedTypes[innerIndex] || "Choose a type"}
              onChange={(e) => handleTypeChange(e, innerIndex)}
              id={`attributesCate.${index}.keyValuePairs.${innerIndex}.country`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Choose a type" disabled>
                Choose a type
              </option>
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
              {/* Add other options based on your data */}
            </select>
          </div>

          {innerIndex === fields.length - 1 ? (
            <CiCirclePlus
              className="text-[28px] text-[#ff7f5d]"
              onClick={handleAddCategory}
            />
          ) : (
            <CiCircleRemove
              className="text-[28px] text-red-800"
              onClick={() => handleRemoveCategory(innerIndex)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default KeyValuePage;
