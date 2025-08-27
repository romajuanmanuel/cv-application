
import { EducationForm } from './organisms/EducationForm'
import GeneralInfoForm from './organisms/GeneralInfoForm'
import { Header } from './organisms/Header'
import { PracticalExperience } from './organisms/PracticalExperience'
export const App = () => {
    return (
        <div className="grid grid-cols-1 gap-4 pt-4 pb-8 pl-8 pr-8 bg-indigo-500">
            <Header/>
            <GeneralInfoForm />
            <EducationForm />
            <PracticalExperience />
        </div>
    )
}
