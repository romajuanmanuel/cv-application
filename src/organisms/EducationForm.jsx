import { useState } from "react";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

export const EducationForm = (props) => {
  const [formData, setFormData] = useState({
    school: "",
    title: "",
    date: "",
  });

  const [educationList, setEducationList] = useState([]);
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
      updatedList = [...educationList];
      updatedList[editIndex] = formData;
      setEducationList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedList = [...educationList, formData];
      setEducationList(updatedList);
    }

    if (props && typeof props.onSave === "function") {
      props.onSave(updatedList);
    }

    setFormData({ school: "", title: "", date: "" });
  };

  const handleEdit = (index) => {
    setFormData(educationList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    if (props && typeof props.onSave === "function") {
      props.onSave(updatedList);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Educational</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:grid lg:grid-cols-3"
      >
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
        />
        <Button type="submit" variant="primary">
          {isEditing ? "Update" : "Add"}
        </Button>
      </form>

      <div className="mt-6">
        {educationList.length === 0 ? (
          <p className="text-gray-500">No education records yet.</p>
        ) : (
          <ul className="space-y-4">
            {educationList.map((edu, index) => (
              <li
                key={index}
                className="p-4 border rounded-xl shadow-sm flex flex-col gap-2 bg-gray-50"
              >
                <p>
                  <strong>School:</strong> {edu.school}
                </p>
                <p>
                  <strong>Title:</strong> {edu.title}
                </p>
                <p>
                  <strong>Date:</strong> {edu.date}
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
