import { useState } from "react";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

export const EducationForm = () => {

  const [formData, setFormData] = useState({
    school: "",
    title: "",
    date: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Education Submitted", formData);
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Educational</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <FormGroup
          id="school"
          label="School"
          type="text"
          value={formData.school}
          onChange={handleChange}
          placeholder="Enter your School"
        />
        <FormGroup
          id="title"
          label="Title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your Title"
        />
        <FormGroup
          id="date"
          label="Graduation Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Enter your Graduation Date"
        />
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  )
}
