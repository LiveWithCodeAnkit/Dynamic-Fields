"use client";
import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import KeyValuePage from "./KeyValuePage";

const AttributesPage = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      attributeGrup: [], // Initialize field array with an empty array
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributeGrup",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const hasAppended = useRef(false);

  useEffect(() => {
    if (!hasAppended.current) {
      handleAddFieldGroup();
      hasAppended.current = true;
    }
  }, [fields, append]);
  const lastCategoryIndex = fields.length - 1;
  const handleRemoveCategory = (index) => {
    remove(index);
  };
  const handleAddFieldGroup = () => {
    append({ attribute_name: "", attribute_group_category: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-10 flex flex-col justify-start items-start gap-2">
        <div className="w-1/4">
          <label
            htmlFor="attribute_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Attribute Group Name
          </label>
          <input
            type="text"
            id="attribute_name"
            {...register("attribute_name")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Attribute Group Name"
          />
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col justify-start items-start gap-2"
          >
            <div className="flex  justify-start items-start gap-2">
              <input
                type="text"
                id={`attribute_group_category_${index}`}
                {...register(`attributeGrup.${index}.attribute_group_category`)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Attribute Group Category"
              />
              {index === lastCategoryIndex ? (
                <CiCirclePlus
                  className="text-[28px] text-[#ff7f5d]"
                  onClick={() => handleAddFieldGroup()}
                />
              ) : (
                <CiCircleRemove
                  className="text-[28px] text-red-800"
                  onClick={() => handleRemoveCategory(index)}
                />
              )}
            </div>

            <KeyValuePage />
          </div>
        ))}

        <button
          type="submit"
          className="text-white bg-[#ff7f5d]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AttributesPage;
