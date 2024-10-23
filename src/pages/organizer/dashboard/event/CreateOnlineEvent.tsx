import EventDetails from "../../../../components/organizer/event/EventDetails"
import EventTimeSlots from "../../../../components/organizer/event/EventTimeSlots"
import ParticipantGuideForm from "../../../../components/organizer/event/ParticipantGuideForm"

const CreateOnlineEvent = () => {
  return (
    <EventDetails />
    // <EventTimeSlots />
    // <ParticipantGuideForm 
    // onSubmit={({ }) => {
    //   // TypeScript will ensure participants and guides match the defined interfaces
    // }}
    // onSkip={() => {
    //   // Handle skip action
    // }}
    // onPrevious={() => {
    //   // Handle navigation to previous step
    // }}
    // />
  )
}

export default CreateOnlineEvent