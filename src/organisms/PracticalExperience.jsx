import { useState } from "react";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

export const PracticalExperience = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    responsability: "",
    from: "",
    until: "",
  });

  const [experienceList, setExperienceList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedList = [];

    if (isEditing) {
      updatedList = [...experienceList];
      updatedList[editIndex] = formData;
      setExperienceList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedList = [...experienceList, formData];
      setExperienceList(updatedList);
    }

    if (props && typeof props.onSave === "function") {
      props.onSave(updatedList);
    }

    setFormData({
      company: "",
      position: "",
      responsability: "",
      from: "",
      until: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(experienceList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);
    if (props && typeof props.onSave === "function") {
      props.onSave(updatedList);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Practical Experience</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:grid lg:grid-cols-3"
      >
        <FormGroup
          id="company"
          label="Company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter your company"
        />
        <FormGroup
          id="position"
          label="Position"
          type="text"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter your position"
        />
        <FormGroup
          id="responsability"
          label="Responsibility"
          type="text"
          value={formData.responsability}
          onChange={handleChange}
          placeholder="Enter your responsibility"
        />
        <FormGroup
          id="from"
          label="From"
          type="date"
          value={formData.from}
          onChange={handleChange}
        />
        <FormGroup
          id="until"
          label="Until"
          type="date"
          value={formData.until}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">
          {isEditing ? "Update" : "Add"}
        </Button>

      </form>


      <div className="mt-6">
        {experienceList.length === 0 ? (
          <p className="text-gray-500">No experiences yet.</p>
        ) : (
          <ul className="space-y-4">
            {experienceList.map((exp, index) => (
              <li
                key={index}
                className="p-4 border rounded-xl shadow-sm flex flex-col gap-2 bg-gray-50"
              >
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Position:</strong> {exp.position}
                </p>
                <p>
                  <strong>Responsibility:</strong> {exp.responsability}
                </p>
                <p>
                  <strong>From:</strong> {exp.from}
                </p>
                <p>
                  <strong>Until:</strong> {exp.until}
                </p>

                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
