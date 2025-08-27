import { useState } from "react";
import FormGroup from "../components/molecules/FormGroup";
import Button from "../components/atoms/Button";

const GeneralInfoForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [generalInfoList, setGeneralInfoList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

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
        if (isEditing) {
            const updatedList = [...generalInfoList]
            updatedList[editIndex] = formData
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setGeneralInfoList((prev) => [...prev, formData]);
            console.log("General Info Submitted:", formData);
        }
        setFormData({
            name: "",
            email: "",
            phone: "",
        })
    };
    const handleEdit = (index) => {
        setFormData(generalInfoList[index])
        setIsEditing(true)
        setEditIndex(index)
    };

    const handleDelete = (index) => {
        setGeneralInfoList((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                <FormGroup
                    id="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />

                <FormGroup
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <FormGroup
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                />

                <Button type="submit" variant="primary">
                    {isEditing ? "Update" : "Add"}
                </Button>
            </form>
            <div className="mt-6">
                {generalInfoList.length === 0 ? (
                    <p className="text-gray-500">No General Info records yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {generalInfoList.map((gen, index) => (
                            <li
                                key={index}
                                className="p-4 border rounded-xl shadow-sm flex flex-col gap-2 bg-gray-50"
                            >
                                <p>
                                    <strong>Name:</strong> {gen.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {gen.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {gen.phone}
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

export default GeneralInfoForm;
