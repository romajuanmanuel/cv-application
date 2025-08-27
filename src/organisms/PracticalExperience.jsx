import { useState } from "react";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

export const PracticalExperience = () => {

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    responsability: "",
    from:"",
    until:"",
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
    console.log("Experience Submitted", formData);
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Practical Experience</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <FormGroup
          id="company"
          label="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter your company"
        />
        <FormGroup
          id="position"
          label="position"
          type="text"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter your position"
        />
        <FormGroup
          id="responsability"
          label="responsability"
          type="text"
          value={formData.responsability}
          onChange={handleChange}
          placeholder="Enter your responsability"
        />
        <FormGroup
          id="from"
          label="from"
          type="date"
          value={formData.from}
          onChange={handleChange}
          placeholder="Enter your from date"
        />
        <FormGroup
          id="until"
          label="until"
          type="date"
          value={formData.until}
          onChange={handleChange}
          placeholder="Enter your until date"
        />
        
      </div>
      <Button type="submit" variant="primary">
          Save
        </Button>
    </form>
  )
}
