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
            setEducationList((prev) => [...prev, formData]);
            console.log("General Info Submitted:", formData);
        }
        setFormData({
            name: "",
            email: "",
            phone: "",
        })
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
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
                    Save
                </Button>
            </div>
        </form>
    );
};

export default GeneralInfoForm;
